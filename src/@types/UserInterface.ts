import mongoose from 'mongoose';

export interface UserRegistration {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface User {
    _id: mongoose.Types.ObjectId;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    role: any[]
}

export interface Project{
    _id: mongoose.Types.ObjectId,
    project_name: String,
    project_description: String,
    assigned: mongoose.Types.ObjectId,
    user_id: mongoose.Types.ObjectId,
    status: string
}