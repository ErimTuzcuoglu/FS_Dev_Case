/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   security:
 *     - BearerAuth: []
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - User
 *     summary: Retrieve a list of users
 *     description: Get a list of all users from the database.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The user ID.
 *                     example: 5f8f8c44b54764421b7156c9
 *                   name:
 *                     type: string
 *                     description: The user's name.
 *                     example: John Doe
 *                   email:
 *                     type: string
 *                     description: The user's email.
 *                     example: jd@gmail.com
 *                   password:
 *                     type: string
 *                     format: date
 *                     description: The user's password.
 *                     example: 123
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - User
 *     summary: Retrieve a specific user by ID
 *     description: Get the details of a specific user by their ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user's ID.
 *         schema:
 *           type: string
 *           example: 5f8f8c44b54764421b7156c9
 *     responses:
 *       401:
 *         description: Access denied
 *       200:
 *         description: The details of the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user ID.
 *                   example: 5f8f8c44b54764421b7156c9
 *                 name:
 *                   type: string
 *                   description: The user's name.
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   description: The user's email.
 *                   example: jd@gmail.com
 *                 password:
 *                   type: string
 *                   format: date
 *                   description: The user's password.
 *                   example: 123
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags:
 *       - User
 *     summary: Create a new user
 *     description: Create a new user with name, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: jd@gmail.com
 *               password:
 *                 type: string
 *                 format: date
 *                 description: The user's password
 *                 example: 123
 *     responses:
 *       201:
 *         description: User successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user ID.
 *                   example: 5f8f8c44b54764421b7156c9
 *                 name:
 *                   type: string
 *                   description: The user's name.
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   description: The user's email.
 *                   example: jd@gmail.com
 *                 password:
 *                   type: string
 *                   format: date
 *                   description: The user's password.
 *                   example: 123
 */

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     tags:
 *       - User
 *     summary: Update a user
 *     security:
 *       - BearerAuth: []
 *     description: Update a user's details by providing their ID, along with name, email, and password.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user's ID.
 *         schema:
 *           type: string
 *           example: 5f8f8c44b54764421b7156c9
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: jd@gmail.com
 *               password:
 *                 type: string
 *                 format: date
 *                 description: The user's password
 *                 example: 123
 *     responses:
 *       401:
 *         description: Access denied
 *       200:
 *         description: User successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user ID.
 *                   example: 5f8f8c44b54764421b7156c9
 *                 name:
 *                   type: string
 *                   description: The user's name.
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   description: The user's email.
 *                   example: jd@gmail.com
 *                 password:
 *                   type: string
 *                   format: date
 *                   description: The user's password.
 *                   example: 123
 */

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags:
 *       - User
 *     summary: Delete a user
 *     description: Delete a user by providing their ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user's ID.
 *         schema:
 *           type: string
 *           example: 5f8f8c44b54764421b7156c9
 *     responses:
 *       401:
 *         description: Access denied
 *       200:
 *         description: User successfully deleted
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags:
 *       - User
 *     summary: User login
 *     description: Authenticate a user by email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: jd@gmail.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: 123
 *     responses:
 *       200:
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   description: A JWT token that can be used for authenticated requests.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Invalid email or password
 */

/**
 * @swagger
 * /api/users/logout/{id}:
 *   get:
 *     tags:
 *       - User
 *     summary: User logout
 *     description: Log out a user by providing their ID in the query parameter.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: The user ID.
 *         schema:
 *           type: string
 *           example: 5f8f8c44b54764421b7156c9
 *     responses:
 *       200:
 *         description: User successfully logged out
 *       400:
 *         description: Missing or invalid user ID
 */

module.exports = {};
