// import client from '$lib/APIClient';
import { APIClient } from '@wharfkit/antelope';
import { writable } from 'svelte/store';

let client = new APIClient({ url: 'https://telos.greymass.com:443' });
const CONTRACT_NAME				=	'feedurmonkey';
const TOKEN_CONTRACT_NAME		= 	'banana.moon';
export const EXPLORER_URL = new URL('https://ajor.io');
export const TG_URL = new URL('https://t.me/feedyourmonkey');
export const TWITTER_URL = new URL('https://twitter.com/feedurmonkey');


export const banana1 = writable('0.0000 BANANA');
export const stash1 = writable('0.0000 BANANA');
export const status1 = writable('🙊');
export const fight1 = writable('💤');
export const monkey1 = writable('-----');
export const banana_peels1 = writable('0.0000 BANANA');
export const wins1 = writable(0);
export const losses1 = writable(0);
export const total_fights1 = writable(0);
export const losing_streak1 = writable(0);
export const xp1 = writable(0);

export const inventory1 = writable([]);
export const equipment1 = writable([]);
export const equipped1 = writable([]);

export const stick_visible = writable('');
export const bat_visible = writable('');
export const nails_visible = writable('');
export const katana_visible = writable('');
export const shiv_visible = writable('');
export const axe_visible = writable('');

 
export async function fetchEquipmentAssets(accountName) {
	const response = await client.v1.chain.get_table_rows({
		code: CONTRACT_NAME,
		scope: accountName,
		table: 'equipment',
		limit: 100
	});

	return response.rows;
}

export async function fetchMonkeyDetails(accountName) {
	const response = await client.v1.chain.get_table_rows({
		code: CONTRACT_NAME,
		scope: CONTRACT_NAME,
		table: 'monkeys',
		lower_bound: accountName,
		upper_bound: accountName,
		limit: 1
	});

	return response.rows[0];
}

export async function fetchBananasBalance(accountName) {
	return fetchTokenBalance(accountName, TOKEN_CONTRACT_NAME);
}

// Helpers
async function fetchTokenBalance(accountName, contractName) {
	const response = await client.v1.chain.get_table_rows({
		code: contractName,
		scope: accountName,
		table: 'accounts'
	});

	const balance = response.rows[0]?.['balance'];
	return parseFloat(balance || 0);
}

export async function fetchExplorerDetails(accountName) {
	const response = await client.v1.chain.get_table_rows({
		code: CONTRACT_NAME,
		scope: CONTRACT_NAME,
		table: 'explorers',
		lower_bound: accountName,
		upper_bound: accountName,
		limit: 1
	});

	return response.rows[0];
}

export async function fetchInventoryAssets(accountName) {
	const response = await client.v1.chain.get_table_rows({
		code: CONTRACT_NAME,
		scope: accountName,
		table: 'inventory',
		limit: 100
	});

	return response.rows;
}

export async function fetchAllMonkeys() {
	let accounts = [];
	let nextKey = null;

	do {
		const response = await client.v1.chain.get_table_rows({
			code: CONTRACT_NAME,
			scope: CONTRACT_NAME,
			table: 'monkeys',
			lower_bound: nextKey,
			limit: 300
		});

		nextKey = response['next_key']; // More results available
		accounts = accounts.concat(response.rows);
	} while (nextKey);

	return accounts;
}

export async function fetchLatestFightLogs(accountName) {
	const response = await client.v1.history.get_actions(accountName, -1, -66);
	const actions = response.actions;
	let fightLogs = [];

	// The array is sorted from the oldest to the newest
	for (let i = actions.length - 1; i >= 0; i--) {
		const actionTrace = actions[i]['action_trace'];
		const act = actionTrace['act'];

		// Only return logs since the last fight
		if (act.account === CONTRACT_NAME && act.name === 'fight') {
			break;
		}

		if (act.account === CONTRACT_NAME && act.name === 'logduel') {
			fightLogs.push(act.data);
		}
	}

	return fightLogs;
}
