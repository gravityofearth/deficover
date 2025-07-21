import { NextRequest, NextResponse } from 'next/server';
import { hubspotService } from '@/services/hubspot';

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function PUT(request: NextRequest, context: any) {
  try {
    const { email } = context.params;
    const { firstname, lastname } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Find the contact by email
    const contact = await hubspotService.getContactByEmail(email);
    if (!contact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    // Update the contact
    await hubspotService.updateContact(contact.id, {
      ...(firstname && { firstname }),
      ...(lastname && { lastname }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating HubSpot contact:', error);
    return NextResponse.json(
      { error: 'Failed to update HubSpot contact', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
