const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://balodhivaishnav:Xd7IpsacvTTL7dyP@cluster0.qmj7w.mongodb.net/database')
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error: ', err));


// Define User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'tutor', 'student'],
    required: true,
  },
});

// Define Course schema
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User (Tutor)
  createdAt: { type: Date, default: Date.now },
});

// Define Lesson schema
const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, // Reference to Course
});

// Define Enrollment schema
const enrollmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User (Student)
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, // Reference to Course
  enrolledAt: { type: Date, default: Date.now },
});

// Create Models
const User = mongoose.model('User', userSchema);
const Course = mongoose.model('Course', courseSchema);
const Lesson = mongoose.model('Lesson', lessonSchema);
const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

// Export models
module.exports = {
  User,
  Course,
  Lesson,
  Enrollment,
};
