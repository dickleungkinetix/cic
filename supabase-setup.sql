-- Create admin_credentials table
CREATE TABLE IF NOT EXISTS admin_credentials (
  id SERIAL PRIMARY KEY,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin password
INSERT INTO admin_credentials (id, password)
VALUES (1, '1234')
ON CONFLICT (id) DO UPDATE SET
  password = EXCLUDED.password,
  updated_at = NOW();

-- Enable Row Level Security (optional, but recommended)
ALTER TABLE admin_credentials ENABLE ROW LEVEL SECURITY;

-- Create policy to allow reading admin credentials (for verification)
CREATE POLICY "Allow reading admin credentials" ON admin_credentials
  FOR SELECT USING (true);

-- Note: In production, you should restrict this policy and use proper authentication
