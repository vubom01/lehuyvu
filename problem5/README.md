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

- POST create /resources (name, type, description, status)
- GET list /resources (allow filter by name, page and pageSize)
- GET detail /resources/:id
- PUT update /resources/:id
- DELETE delete /resources/:id