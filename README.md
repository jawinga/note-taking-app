# 📝 Notes Application / Aplicación de Notas

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Auth-Clerk-blueviolet?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com/)
[![Lucide](https://img.shields.io/badge/Icons-LuCide-000000?style=for-the-badge&logo=lucide&logoColor=white)](https://lucide.dev/)

A modern, full-stack note-taking application built with Next.js, TypeScript, PostgreSQL, Prisma ORM, and Clerk Authentication. Features real-time data persistence, user-specific tags, and a clean, responsive UI.

## 🚀 Tech Stack / Tecnologías

**Frontend:**
- Next.js 15 (App Router)
- React with Context API (useContext, useState, custom hooks)
- TypeScript
- Tailwind CSS for styling
- Lucide Icons
- HeadlessUI for modals and dialogs

**Backend:**
- Next.js API Routes
- Prisma ORM
- PostgreSQL (Neon)
- Clerk Authentication

## ✨ Features / Funcionalidades

### English
- ➕ **Create notes** with:
  - Title
  - Rich text content
  - Tags with custom colors (user-specific)
  - Favorite marking
- 📂 **View all notes** in a responsive, card-based grid
- 🖊️ **Edit notes** with full CRUD operations
- ⭐ **Mark notes as favorites** for quick access
- 🔍 **Search** across note titles in real-time
- 🏷️ **Tag management** - Create, reuse, and delete tags
- 🔐 **Secure authentication** with Clerk
- 💾 **Persistent storage** in PostgreSQL database
- 👤 **User-specific data** - Each user's notes and tags are private

### Español
- ➕ **Crear notas** con:
  - Título
  - Contenido de texto enriquecido
  - Etiquetas con colores personalizados (específicas del usuario)
  - Marcar como favorito
- 📂 **Ver todas las notas** en una cuadrícula adaptable con tarjetas
- 🖊️ **Editar notas** con operaciones CRUD completas
- ⭐ **Marcar notas como favoritas** para acceso rápido
- 🔍 **Buscar** en títulos de notas en tiempo real
- 🏷️ **Gestión de etiquetas** - Crear, reutilizar y eliminar etiquetas
- 🔐 **Autenticación segura** con Clerk
- 💾 **Almacenamiento persistente** en base de datos PostgreSQL
- 👤 **Datos específicos del usuario** - Notas y etiquetas privadas para cada usuario

## 📸 Screenshots / Capturas de pantalla

_Add screenshots here:_
- 🔑 Login screen with Clerk
- 📝 Note creation form with tag editor
- 📂 Notes grid with search
- ✏️ Edit modal with tag management
- 🗑️ Delete confirmation

## 🏗️ Architecture / Arquitectura

### Database Schema
```prisma
Note
├── id (UUID)
├── userId (String - Clerk ID)
├── title
├── content
├── favourite
├── createdAt
├── updatedAt
└── tags[] (NoteTags)

Tag
├── id (UUID)
├── tag (String)
├── colour (String)
├── userId (String - Clerk ID)
└── notes[] (NoteTags)

NoteTags (Join Table)
├── noteId
└── tagId
```

### Project Structure
```
src/
├── app/
│   ├── api/
│   │   ├── notes/route.ts       # CRUD endpoints for notes
│   │   └── tags/route.ts        # GET/DELETE endpoints for tags
│   ├── components/
│   │   └── features/
│   │       ├── Noteform/        # Note creation form
│   │       ├── List/            # Notes display & search
│   │       └── Card/            # Individual note card
│   ├── context/
│   │   ├── NotesContext.tsx     # Global notes state
│   │   └── TagsContext.tsx      # Global tags state
│   └── main/page.tsx            # Main application page
├── lib/
│   ├── services/
│   │   └── notes.service.ts     # API service layer
│   └── prisma.ts                # Prisma client
└── prisma/
    └── schema.prisma            # Database schema
```

## 🛠️ Installation & Setup / Instalación y Configuración

### English

1. **Clone the repository**
```bash
git clone https://github.com/your-username/notes-app.git
cd notes-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file with:
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key

# Database (Neon PostgreSQL)
DATABASE_URL=your_postgresql_connection_string

# App URL (for API calls)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Set up the database**
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Open Prisma Studio to view data
npx prisma studio
```

5. **Run the development server**
```bash
npm run dev
```

6. **Open [http://localhost:3000](http://localhost:3000)**

---

### Español

1. **Clona el repositorio**
```bash
git clone https://github.com/your-username/notes-app.git
cd notes-app
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Configura las variables de entorno**

Crea un archivo `.env.local` con:
```env
# Autenticación Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=tu_clave_publicable
CLERK_SECRET_KEY=tu_clave_secreta

# Base de datos (Neon PostgreSQL)
DATABASE_URL=tu_cadena_de_conexion_postgresql

# URL de la aplicación (para llamadas API)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Configura la base de datos**
```bash
# Genera el cliente Prisma
npx prisma generate

# Ejecuta las migraciones
npx prisma migrate dev

# (Opcional) Abre Prisma Studio para ver los datos
npx prisma studio
```

5. **Inicia el servidor de desarrollo**
```bash
npm run dev
```

6. **Abre [http://localhost:3000](http://localhost:3000)**

## 🔑 Key Concepts / Conceptos Clave

### Service Layer Pattern
All API calls go through `NotesService` for:
- Type safety
- Error handling
- Data transformation between backend (Prisma) and frontend (React)

### Context API for State Management
- `NotesContext` - Manages notes state globally
- `TagsContext` - Manages user's tags with database sync

### Prisma Transactions
Complex operations (creating notes with tags) use Prisma transactions to ensure data consistency:
```typescript
await prisma.$transaction(async (tx) => {
  // Create note
  // Create/find tags
  // Link them in NoteTags
  // Return complete note with tags
});
```

## 🧭 Roadmap / Próximos pasos

### English
- ⭐ Filter to show favorited notes first
- 📊 Analytics dashboard (note count, tags usage)
- 📤 Export notes to PDF/Markdown
- 🎨 Theme customization (dark mode)
- 🔔 Reminders and notifications
- 📱 Progressive Web App (PWA) support
- 🤝 Shared notes between users

### Español
- ⭐ Filtro para mostrar primero las notas favoritas
- 📊 Panel de análisis (contador de notas, uso de etiquetas)
- 📤 Exportar notas a PDF/Markdown
- 🎨 Personalización de tema (modo oscuro)
- 🔔 Recordatorios y notificaciones
- 📱 Soporte para Progressive Web App (PWA)
- 🤝 Notas compartidas entre usuarios

## 📚 Learning Resources / Recursos de Aprendizaje

This project demonstrates:
- Full-stack Next.js development with App Router
- TypeScript with strict typing
- Prisma ORM with PostgreSQL
- RESTful API design
- React Context for state management
- Service layer architecture
- Database relationships (many-to-many)
- User authentication with Clerk
- Responsive UI with Tailwind CSS

## 📄 License / Licencia

This project is open source and available under the MIT License.

## 👤 Author / Autor

**Cristian Harders**  
Full-Stack Developer | React / Next.js / TypeScript  
[GitHub](https://github.com/your-username) | [LinkedIn](https://linkedin.com/in/your-profile)

---

⭐ If you found this project helpful, please give it a star!  
⭐ Si este proyecto te ha sido útil, ¡dale una estrella!
