#!/usr/bin/env python3
"""Upsert a fixed set of users into the VPS NDTConnect2.users collection.
CA-verified TLS; VPS password read at runtime via SSH (no secrets on disk)."""
import sys, subprocess, datetime
from pathlib import Path

VPS_IP, VPS_PORT, DB = "148.230.122.172", "47017", "NDTConnect2"
SSH_KEY = r"C:\Users\anuan\.ssh\atlantis_vps"
CA_PATH = Path(__file__).resolve().parent.parent / "certs" / "vps-mongo-ca.pem"

def vps_pw():
    return subprocess.check_output(
        ["ssh", "-i", SSH_KEY, "-o", "BatchMode=yes", f"root@{VPS_IP}",
         "source /opt/mongo/.secrets; echo $APPPW"], text=True).strip()

def main():
    import bcrypt
    from pymongo import MongoClient
    pw = vps_pw()
    uri = (f"mongodb://ndtapp:{pw}@{VPS_IP}:{VPS_PORT}/{DB}"
           f"?tls=true&authSource={DB}&tlsCAFile={CA_PATH.as_posix()}")
    users = MongoClient(uri, serverSelectionTimeoutMS=10000)[DB]["users"]
    now = datetime.datetime.now(datetime.timezone.utc)

    def h(p):
        return bcrypt.hashpw(p.encode(), bcrypt.gensalt(10)).decode()

    # (email, name, role, password, mustResetPassword)
    profiles = [
        ("anoop@atlantisinspection.com", "Anoop R",            "admin",    "Atlantis9$", False),
        ("info@atlantisndt.com",         "Atlantis NDT",       "provider", "Atlantis9$", False),
        ("sales@atlantisndt.com",        "Atlantis NDT Sales", "client",   "Atlantis9$", False),
        # td@ndt.net: placeholder pw + mustResetPassword -> login emails a setup link
        ("td@ndt.net",                   "TD (NDT.net)",       "provider", None,         True),
    ]

    for email, name, role, plain, must_reset in profiles:
        pwd = h(plain) if plain else h("changeme-" + email)  # required field; unusable until reset
        users.update_one(
            {"email": email},
            {"$set": {"name": name, "role": role, "password": pwd,
                      "isActive": True, "verified": True,
                      "mustResetPassword": must_reset, "updatedAt": now},
             "$setOnInsert": {"profileData": {}, "createdAt": now}},
            upsert=True)
        print(f"  {email:32s} role={role:9s} mustReset={must_reset}")

    print(f"\nTotal users in {DB}: {users.count_documents({})}")
    for u in users.find({}, {"email": 1, "role": 1, "mustResetPassword": 1, "_id": 0}):
        print(" ", u)

if __name__ == "__main__":
    main()
