## Run project

```
$ cd problem5
$ npm install
$ docker compose up -d
$ npm run migrate-up
$ npm run dev
```

## Resource Data

- id: int
- name: string
- type: int
- description: string
- status: int
- createdAt: timestamp
- updatedAt: timestamp

## API

- API create: name, type, description, status
- API list: allow filter by name, page and pageSize
- API detail: id
- API update: id, name, type, description, status
- API delete: id