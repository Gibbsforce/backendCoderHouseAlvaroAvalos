const options = {
    memory: {
    },
    file: {
        path: "./DB"
    },
    mongodb: {
        host: "mongodb://localhost/ecommerce",
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        }
    },
    firestore: {
        "type": "service_account",
        "project_id": "chnjs-22b51",
        "private_key_id": "2c20a57130cd20d95bfecfba2b9f0a32e7cfe954",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDlwR26L4SBrUnf\nnTHzgcnaB4dsEP6zeXyZOY5iXhQq3qkoNeyiZzdsLiEuRZFntnGaUijcXFCjVK6/\n7MZKj7sbWqUp15N/AM3RfLjBRbWlxqWG/sjomGfxyHQbL+RaGUU0Q1Wcn6TKMf1I\nXOqIlFjYxIR9oIyhwkXK0+XRsYCy/zTJ3Uxpu8aRdPVxgz1zak0BIg10GsPO4R9K\nTAMs8ay4YRioyUm7k/LUhJe5WiPz2tJPV+XxKTkqWtfKIEgIo1rgHmXwQHezuwDj\nBFEfNTOXihnqiGLc1/+8z/RkfdwNoVxzxEOwPVauJpEiIuKHgYgdHntMgYY6wL5A\nkqP06BTzAgMBAAECggEAK4bqmttlvyuVU0f0rq1oEGZcwZx2pInfkSfWUcyBBZ4p\nbfTJX/suBNC4eIu1gHCQFSx7kUPsAwWIFdRFvNp+GDCUGdk9mFIOrCF03yjVwRJh\nSbH7XhWBm8zeMkhgerFO6xfWoFWeYrAVzB/OTxHLw0V31FUWT47+qe57G78FIuPa\nocLJDEvzOxz30VUhbNyvWLzKeTFwK4NMZHzb4ABMWgXZHKXOAWYngkOmJjJOY4C3\n/oH1+eDUUYiJK7WmKz840jnDpltGfH1+iYy3XT7NUpgmR0ECMU5EZjplr/IVJIbX\nIlCMAUq7OgCdVPjuJjG9I7sm6i0dzpnmKUaeFWCMAQKBgQD9Oq7qtJlOdH1CM8FK\n2AXPLc/OtaeP1/hLIMrUm6xwUnFiTtPxtSB6k0RseLCs0BMKdtgW7FnXw8vy7d1b\nnPY12APeMOfk5ncxQYi4MZ8a2A0eqllLX3XjZpsAtcLX4ZBzwQElymSrOdorvkKH\n/gW2tXiWUrfl71itRhBjnpVCZQKBgQDoRK1/v0ImJzC2Ps9qpfz7Z4ZNd0bNwmJl\n0ObIXTnDxeQZ7cZHYb8pkNsMCg39SbyoMQlIgbNgXLnjyH3vs3uThGvkxqA55kFG\nP5nt1glXusG/OMamSZR3oCDpkodyjSN5AR6IaqfqsmegU5USozfKXUAREnJeZ0ny\nkAS9Hu3YdwKBgQDlVrJ4ClwV+9Y9kNXsTLzmJ91enpJE6hoLIIXSC7MefuwFVtMI\nwzvJB3seqieIO2IjRgLqr9+mU8NwHhEuGXe6yAqovq4mVrt4Npv2BarNCwLG1QzO\nAISqEJEtEXCHR9glnZTGfwixMlHu7/8dXugZ0zyFGCFI833iX+QT9NnFKQKBgQCF\nZxSjX61VjoLK2a512ZpApwgbLButiCzNv7sdb3YC/IDzZ37PdtO9wuYctxWr2ZMS\nov9q9puZCAj4TCoQ52xdoNv7TR2vw5DQES2OzbUV/zzSYICv92jfgEgG/1LuNyQd\nlsf7oA6LnSYpjnf7eWVMxFxMseSgVgDB4XfnS4FeJwKBgQCcThDSMc9Udc0Y/uhf\nY2+l3vcVW1ISsS4BGt9ssjLk+txUdxYGOEsj6uU072lzmBb9aMTcdfMYCNuaQ4Jv\nmW+Fqs176RxWN8P29C0WxgsrChf+alNd9D212HJ30w8rewvqT6LWK0N+Cb3QPrGS\n/EAiouGa57cw0oc1t/KFlPivhg==\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-jari6@chnjs-22b51.iam.gserviceaccount.com",
        "client_id": "110798134923453341573",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-jari6%40chnjs-22b51.iam.gserviceaccount.com"
    }
}
module.exports = options;