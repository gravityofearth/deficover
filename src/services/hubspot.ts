import { Client } from '@hubspot/api-client';

// Basic HubSpot client setup
const hubspotClient = new Client({
  accessToken: process.env.NEXT_PUBLIC_HUBSPOT_ACCESS_TOKEN,
});

// Simple HubSpot service class
export class HubSpotService {
  private client: Client;

  constructor() {
    this.client = hubspotClient;
  }

  // Create a new contact in HubSpot
  async createContact(contactData: {
    email: string;
    firstname?: string;
    lastname?: string;
  }) {
    try {
      const response = await this.client.crm.contacts.basicApi.create({
        properties: {
          email: contactData.email,
          ...(contactData.firstname && { firstname: contactData.firstname }),
          ...(contactData.lastname && { lastname: contactData.lastname }),
        },
      });

      return response;
    } catch (error) {
      console.error('Error creating HubSpot contact:', error);
      throw error;
    }
  }

  async updateContact(contactId: string, properties: { firstname?: string; lastname?: string }) {
    try {
      return await this.client.crm.contacts.basicApi.update(contactId, { properties });
    } catch (error) {
      console.error('Error updating HubSpot contact:', error);
      throw error;
    }
  }
  // Get contact by email
  async getContactByEmail(email: string) {
    try {
      const response = await this.client.crm.contacts.searchApi.doSearch({
        filterGroups: [
          {
            filters: [
              {
                propertyName: 'email',
                operator: 'EQ' as any,
                value: email,
              },
            ],
          },
        ],
        properties: ['email', 'firstname', 'lastname'],
      });

      return response.results[0] || null;
    } catch (error) {
      console.error('Error getting HubSpot contact:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const hubspotService = new HubSpotService(); 