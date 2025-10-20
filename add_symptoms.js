const mongoose = require('./backend/node_modules/mongoose');
const Symptom = require('./backend/src/models/Symptom');

const connectDB = async() => {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/medi_aid';
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
};

const addSymptoms = async() => {
    const symptoms = [
        { name: 'Fever', description: 'Elevated body temperature above 98.6°F (37°C)' },
        { name: 'Headache', description: 'Pain in the head or neck region' },
        { name: 'Cough', description: 'Sudden expulsion of air from the lungs' },
        { name: 'Fatigue', description: 'Extreme tiredness or lack of energy' },
        { name: 'Sore Throat', description: 'Pain or irritation in the throat' },
        { name: 'Shortness of Breath', description: 'Difficulty breathing or feeling breathless' },
        { name: 'Body Aches', description: 'Pain in muscles or joints' },
        { name: 'Nausea', description: 'Feeling of sickness with an inclination to vomit' },
        { name: 'Dizziness', description: 'Feeling lightheaded or unsteady' },
        { name: 'Chest Pain', description: 'Pain in the chest area' },
        { name: 'Abdominal Pain', description: 'Pain in the stomach or abdominal area' },
        { name: 'Vomiting', description: 'Expulsion of stomach contents through the mouth' },
        { name: 'Diarrhea', description: 'Frequent loose or watery stools' },
        { name: 'Rash', description: 'Change in skin color or texture' },
        { name: 'Chills', description: 'Feeling cold and shivering' },
        { name: 'Loss of Appetite', description: 'Reduced desire to eat' },
        { name: 'Sweating', description: 'Excessive perspiration' },
        { name: 'Confusion', description: 'Mental state of reduced comprehension' },
        { name: 'Muscle Weakness', description: 'Reduced strength in muscles' },
        { name: 'Joint Pain', description: 'Pain in the joints' }
    ];

    try {
        await connectDB();
        await Symptom.insertMany(symptoms);
        console.log('Symptoms added successfully');
    } catch (error) {
        console.error('Error adding symptoms:', error);
    } finally {
        mongoose.connection.close();
    }
};

addSymptoms();