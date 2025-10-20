const mongoose = require('mongoose');

async function updateAdmin() {
    try {
        await mongoose.connect('mongodb://localhost:27017/medi_aid');
        const result = await mongoose.connection.db.collection('users').updateOne({ email: 'admin@example.com' }, { $set: { role: 'admin' } });
        console.log('Update result:', result);
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

updateAdmin();