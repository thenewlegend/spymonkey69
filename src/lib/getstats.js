import client from '$lib/APIClient';
import { CONTRACT_NAME, TOKEN_CONTRACT_NAME } from '$lib/config';
import { writable } from 'svelte/store';

export const banana1 = writable('0.0000 BANANA');
export const banana2 = writable('0.0000 BANANA');
export const stash1 = writable('0.0000 BANANA');
export const stash2 = writable('0.0000 BANANA');
export const status1 = writable('🙊');
export const status2 = writable('🙊');

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
