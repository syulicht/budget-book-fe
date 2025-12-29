# Budget Book Frontend

家計簿アプリケーションのフロントエンド

## Tech Stack

- **React** 19.2.0
- **TypeScript** 5.9.3
- **Vite** 7.2.4
- **TanStack Router** - ルーティング
- **TanStack Query** - データフェッチング
- **Tailwind CSS** - スタイリング
- **AWS Cognito** - 認証 (Hosted UI)

## Project Structure

```
src/
├── routes/              # TanStack Router routes
├── features/            # Feature-based modules
│   ├── auth/
│   ├── transactions/
│   ├── categories/
│   └── dashboard/
├── components/          # Shared components
│   ├── ui/              # Basic UI components
│   └── layouts/         # Layout components
├── lib/                 # Library configurations
│   ├── api/             # API client setup
│   └── auth/            # Auth configuration
├── hooks/               # Custom hooks
├── utils/               # Utility functions
├── types/               # Type definitions
└── constants/           # Constants
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file:

```
VITE_AWS_REGION=
VITE_COGNITO_USER_POOL_ID=
VITE_COGNITO_APP_CLIENT_ID=
VITE_REDIRECT_URI=
VITE_LOGOUT_URI=
VITE_COGNITO_DOMAIN=
VITE_API_BASE_URL=
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

### Deploy

```bash
npm run build
aws s3 sync dist/ s3://mm-app-fe-bucket
```

## Code Style

- TypeScript strict mode
- Functional components only
- Tailwind CSS for styling
- Feature-based architecture

## License

MIT
