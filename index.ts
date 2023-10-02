// Import necessary libraries and modules
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory as helpdesk_idl, canisterId as helpdesk_id } from "canisters/helpdesk";
import { Principal } from "@dfinity/principal";

// Initialize the Internet Computer agent
const agent = new HttpAgent();
const canisterPrincipal = Principal.fromText(helpdesk_id);

// Create an actor to interact with the Canister
const helpdesk = Actor.createActor(helpdesk_idl, { agent, canisterId: canisterPrincipal });

// Define CRUD operations
async function createQuery(description: string): Promise<void> {
  await helpdesk.createQuery(description);
}

async function getQuery(queryId: bigint): Promise<any> {
  return await helpdesk.getQuery(queryId);
}

async function updateQueryStatus(queryId: bigint, newStatus: string): Promise<void> {
  await helpdesk.updateQueryStatus(queryId, newStatus);
}

async function deleteQuery(queryId: bigint): Promise<void> {
  await helpdesk.deleteQuery(queryId);
}

// Example usage
async function main() {
  // Create a new query
  await createQuery("How can I reset my password?");

  // Get query details
  const queryId = 1n;
  const queryDetails = await getQuery(queryId);
  console.log("Query Details:", queryDetails);

  // Update query status
  await updateQueryStatus(queryId, "Answered");

  // Delete a query
  await deleteQuery(queryId);
}

main().catch(console.error);
