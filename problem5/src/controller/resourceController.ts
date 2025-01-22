import db from "../db/connection"

export const create = (req: any, res: any): void => {
    const {name, type, description, status} = req.body;
    if (!name || !type || !status) {
        return res.status(400).json({
            code: 400,
            message: "Missing required field",
            data: null
        });
    }

    const query = "INSERT INTO resources (name, type, description, status) VALUES (?, ?, ?, ?)";
    db.query(query, [name, type, description, status], (err: any, result: any) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: "Failed to create resource",
                data: err
            });
        }

        res.status(200).json({
            code: 200,
            message: "Success",
            data: result.insertId,
        });
    });
};

export const list = (req: any, res: any) => {
    const page = parseInt(req.query.page) || 1;  // Default to page 1 if not provided
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;

    const name = req.query.name || '';

    const query = "SELECT * FROM resources WHERE name LIKE ? LIMIT ? OFFSET ?";
    const queryParams = [`%${name}%`, pageSize, offset];
    db.query(query, queryParams, (err: any, resources: any[]) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: "Failed to fetch resources",
                data: err
            });
        }

        const countQuery = "SELECT COUNT(*) AS total FROM resources WHERE name LIKE ?";
        db.query(countQuery, [`%${name}%`], (countErr: any, countResult: any[]) => {
            if (countErr) {
                return res.status(500).json({
                    code: 500,
                    message: "Failed to count resources",
                    data: null
                });
            }

            const total = countResult[0].total;

            res.json({
                code: 200,
                message: "Success",
                data: {
                    resources: resources,
                    pagination: {
                        page: page,
                        pageSize: pageSize,
                        total: total,
                    },
                },

            });
        });
    });
};

export const detail = (req: any, res: any): void => {
    const {id} = req.params;

    if (!id) {
        return res.status(400).json({
            code: 400,
            message: "Resource ID is required",
            data: null
        });
    }

    const query = "SELECT * FROM resources WHERE id = ?";
    db.query(query, [id], (err: any, resources: any[]) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: "Failed to fetch resource details",
                data: err
            });
        }

        if (resources.length === 0) {
            return res.status(404).json({
                code: 404,
                message: "Resource not found",
                data: null
            });
        }

        const resource = resources[0];
        res.json({
            code: 200,
            message: "Success",
            data: {
                resource: resource
            }
        });
    });
};

export const update = (req: any, res: any): void => {
    const {id} = req.params;
    if (!id) {
        return res.status(400).json({
            code: 400,
            message: "Resource ID is required",
            data: null
        });
    }

    const {name, type, description, status} = req.body;
    let updateFields: string[] = [];
    let updateValues: any[] = [];
    if (name) {
        updateFields.push("name = ?");
        updateValues.push(name);
    }
    if (type) {
        updateFields.push("type = ?");
        updateValues.push(type);
    }
    if (description) {
        updateFields.push("description = ?");
        updateValues.push(description);
    }
    if (status) {
        updateFields.push("status = ?");
        updateValues.push(status);
    }

    if (updateFields.length === 0) {
        return res.status(400).json({
            code: 400,
            message: "At least one field must be provided",
            data: null
        });
    }

    updateValues.push(id);

    const query = `UPDATE resources SET ${updateFields.join(', ')} WHERE id = ?`;

    db.query(query, updateValues, (err: any, result: any) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: "Failed to update resource",
                data: null
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                code: 404,
                message: "Resource not found",
                data: null
            });
        }

        res.json({
            code: 200,
            message: "Success",
            data: Number(id),
        });
    });
}

export const deleteResource = (req: any, res: any): void => {
    const {id} = req.params;
    if (!id) {
        return res.status(400).json({
            code: 400,
            message: "Resource ID is required",
            data: null
        });
    }

    const query = "DELETE FROM resources WHERE id = ?";
    db.query(query, [id], (err: any, result: any) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                code: 500,
                message: "Failed to delete resource",
                data: null
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                code: 404,
                message: "Resource not found",
                data: null
            });
        }

        res.json({
            code: 200,
            message: "Success",
            data: Number(id),
        });
    });

}