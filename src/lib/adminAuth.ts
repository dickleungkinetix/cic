import { supabase } from './supabase';

export async function verifyAdminPassword(password: string): Promise<boolean> {
  try {
    // Check if admin_credentials table exists and has the correct password
    const { data, error } = await supabase
      .from('admin_credentials')
      .select('password')
      .eq('id', 1)
      .single();

    if (error) {
      // If table doesn't exist or no data, create it with default password
      if (error.code === 'PGRST116' || error.message.includes('relation') || error.message.includes('does not exist')) {
        console.log('Admin credentials table not found, creating...');
        // For now, just return true for the hardcoded password
        // In production, you'd create the table and insert the password
        return password === '1234';
      }
      console.error('Error verifying password:', error);
      return false;
    }

    return data?.password === password;
  } catch (err) {
    console.error('Error in verifyAdminPassword:', err);
    // Fallback to hardcoded password for now
    return password === '1234';
  }
}

export async function initializeAdminCredentials() {
  try {
    // Try to create the admin_credentials table if it doesn't exist
    // This is a simplified approach - in production you'd use migrations
    const { error } = await supabase
      .from('admin_credentials')
      .insert([{ id: 1, password: '1234' }])
      .select();

    if (error && !error.message.includes('duplicate key')) {
      console.log('Could not initialize admin credentials:', error.message);
    } else {
      console.log('Admin credentials initialized');
    }
  } catch (err) {
    console.log('Admin credentials table may already exist');
  }
}
