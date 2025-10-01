<p align="center">
  <img src="https://raw.githubusercontent.com/yourusername/your-repo/main/logo.png" width="200" alt="Product Manager Logo">
</p>

<h1 align="center">Product Manager App</h1>

<p align="center">
  <a href="https://github.com/yourusername/your-repo/actions">
    <img src="https://github.com/yourusername/your-repo/workflows/CI/badge.svg" alt="Build Status">
  </a>
  <a href="https://github.com/yourusername/your-repo/releases">
    <img src="https://img.shields.io/github/v/release/yourusername/your-repo" alt="Latest Release">
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/github/license/yourusername/your-repo" alt="License">
  </a>
</p>

---

## About Product Manager App

**Product Manager App** is a web application built with **Laravel**, **Inertia.js**, and **React** to efficiently manage products. It provides a modern interface with backend functionality including:

- Create, Read, Update, Delete (CRUD) products
- Search and filter products
- Real-time updates using Inertia.js
- Responsive, interactive UI with React
- Easy-to-maintain Laravel backend

This project demonstrates a modern approach to building full-stack applications using Laravel + React + Inertia.

---

## Screenshots

<p align="center">
  <img src="https://raw.githubusercontent.com/yourusername/your-repo/main/screenshots/dashboard.png" width="600" alt="Dashboard">
  <br>
  <em>Dashboard view showing products list</em>
</p>

---

## Getting Started

### Requirements

- PHP >= 8.1  
- Composer  
- Node.js & npm  
- MySQL or another supported database  

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/your-repo.git
cd your-repo

# Install PHP dependencies
composer install

# Install JS dependencies
npm install
npm run dev

# Copy environment file and set application key
cp .env.example .env
php artisan key:generate

# Configure your database in .env
# DB_DATABASE=your_database
# DB_USERNAME=your_username
# DB_PASSWORD=your_password

# Run migrations
php artisan migrate

# Start the development server
php artisan serve
