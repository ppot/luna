# Be sure to restart your server when you modify this file.

# Your secret key is used for verifying the integrity of signed cookies.
# If you change this key, all old signed cookies will become invalid!

# Make sure the secret is at least 30 characters and all random,
# no regular words or you'll be exposed to dictionary attacks.
# You can use `rake secret` to generate a secure secret key.

# Make sure your secret_key_base is kept private
# if you're sharing your code publicly.
LOG::Application.config.secret_key_base = '59f22c3e5e4ed235461b043068f9e14b7f4223cb1828403d018b35326c8077bab32d0c28561efc64a663616f0f9900b91fb080788ee49bc70d03c80c01ebaf47'
