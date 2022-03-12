<div align="center">

![Website](https://img.shields.io/website?down_color=red&down_message=DOWN&label=HEROKU&logo=heroku&style=for-the-badge&up_color=brightgreen&up_message=ACTIVE&url=https%3A%2F%2Fnodejs-interactive-comments.herokuapp.com%2F)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/Yazdun/nodejs-interactive-comments?logo=github&logoColor=white&style=for-the-badge)
![GitHub repo size](https://img.shields.io/github/repo-size/Yazdun/nodejs-interactive-comments?color=violet&logo=github&logoColor=white&style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/Yazdun/nodejs-interactive-comments?color=lightgray&logo=git&logoColor=white&style=for-the-badge)

<!-- PROJECT LOGO -->
<br />
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="./docs/assets/fem.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">INTERACTIVE COMMENTS API</h3>

  <p align="center">
    create comment threads with this api
    <br />
    <br />
    <a href="https://nodejs-interactive-comments.herokuapp.com/" target="_blank">Live Demo</a>
    ·
    <a href="https://github.com/Yazdun/nodejs-interactive-comments/issues">Report Bug</a>
    ·
    <a href="https://github.com/Yazdun/nodejs-interactive-comments/issues">Request Feature</a>
  </p>
</div>

## About The Project

I built this api as part of a full stack Frontend mentor challenge for creating
an interactive comments section, you can find the UI for this challenge which I
built with NextJS following the link below 👇

🔗
[NextJS Interactive comments section ](https://github.com/Yazdun/frontend-mentor/tree/interactive-comments-section)

## Built with

This API is built with `Node.JS` and `Express.JS`, using `MongoDB` for database
and `JWT` for user authentication.

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [JWT](https://jwt.io/)

## Getting Started

To run this project on your local machine do the following steps :

1. Clone the repo
   ```sh
   git clone git@github.com:Yazdun/nodejs-interactive-comments.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create `.env` file and fill following fields
   ```
   MONGO_URI = insert your mongo shell uri here
   JWT_SECRET = password to generate JWT
   JWT_LIFETIME = time to expire jwt token
   ```
4. Run the nodemon server
   ```sh
   npm run dev
   ```

## Contributing

Contributions are what make the open source community such an amazing place to
learn, inspire, and create. Any contributions you make are **greatly
appreciated**.

If you have a suggestion that would make this better, please fork the repo and
create a pull request. You can also simply open an issue with the tag
"enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

❤️ Thanks for your time and attention
