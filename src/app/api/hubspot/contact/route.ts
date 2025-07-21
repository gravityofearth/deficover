import { NextRequest, NextResponse } from 'next/server';
import { hubspotService } from '@/services/hubspot';

export async function POST(request: NextRequest) {
  try {
    // Check if HubSpot token is configured
    if (!process.env.NEXT_PUBLIC_HUBSPOT_ACCESS_TOKEN) {
      return NextResponse.json(
        { error: 'HubSpot access token not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { email, firstname, lastname } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Try to create a contact in HubSpot
    const contact = await hubspotService.createContact({
      email,
      firstname,
      lastname,
    });

    return NextResponse.json({
      success: true,
      message: 'Contact created successfully',
      contact: {
        id: contact.id,
        email: contact.properties?.email,
      },
    });

  } catch (error) {
    console.error('HubSpot test error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to create HubSpot contact',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Check if HubSpot token is configured
    if (!process.env.NEXT_PUBLIC_HUBSPOT_ACCESS_TOKEN) {
      return NextResponse.json(
        { error: 'HubSpot access token not configured' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'HubSpot integration is configured',
      hasToken: !!process.env.NEXT_PUBLIC_HUBSPOT_ACCESS_TOKEN,
    });

  } catch (error) {
    console.error('HubSpot test error:', error);
    
    return NextResponse.json(
      { 
        error: 'HubSpot integration test failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 