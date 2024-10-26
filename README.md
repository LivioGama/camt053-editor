# Welcome to the CAMT.053 File Editor! 👋

This project is a user-friendly editor for CAMT.053 files, built with NextJS and Chakra UI 3.0.0. It's designed to make working with financial transaction data
a breeze!

Example use case: You have a single bank account for personal and business expenses / revenues, and you want to clean the import file that will be integrated into your favorite accounting software (for example bexio).

## 🚀 Try It Out!

You can see the editor in action at [camt053-editor.liviogama.com](https://camt053-editor.liviogama.com/).

![Screenshot of the editor](https://github.com/liviogama/camt053-editor/blob/main/screenshot.webp?raw=true)

## 🛠️ Getting Started with Development

Let's get you set up to run this project locally. It's easy, we promise!

### Step 1: Set Up the Database

First, let's get our database running:

```bash
bun run pocketbase-serve
```

Now, head over to http://127.0.0.1:8090/_/ and create an admin account for your local Pocketbase SQLite database.

NB: The current pocketbase binary is the macOS one. You might need to replace it, or run on it (if you have any issues): 

```bash
sudo chmod +x pocketbase/pocketbase
```

### Step 2: Run the Development Server

Time to fire up the development server:

```bash
bun dev
```

Great! Now open http://localhost:3000 in your browser, and you're ready to go!

### Step 3: Try It Out

You have two options to get started:

- Open the `sample-camt.053.xml` file and copy its content into the editor `textarea`.
- or click the handy "Use example" button in the app.

The file will be parsed, and the transactions will be added to the Pocketbase database and displayed in your browser.

📝 Note: We check for duplicate transactions by comparing descriptions because there are no unique identifiers in the transactions. If you have multiple transactions with the same description, they'll be skipped to avoid
duplicates.

NB: Why not do this in the localstorage HTML5 ? Because camt.053 files are generally too big and hit the limit of what can be stored in localstorage, unfortunately.

## 🧹 Cleaning Up Transaction Descriptions

Want to tidy up those transaction descriptions that looks like :
`APPLE PAY ACHAT/SHOPPING EN LIGNE DU 08.04.2024 33.40 EUR AU COURS DE 0.9897 MONTANT DANS LA MONNAIE DU COMPTE 33.06 1.5% FRAIS DE TRAITEMENT 0.50 CARTE N° XXXX2360 SNCF WEB MOBILE PARIS 12`
? We use the awesome ollama library for this to run a LLM locally with no additional cost.

Here's how to set it up:

Install [ollama](https://ollama.com/) on your system.

Pull the model we are going to use:

```bash
ollama pull llama3
```

With the model running, update all transactions descriptions in the database by running:

```bash
bun playground/index.js
```

And that's it! Your transactions will now have cleaner, more readable descriptions that looks like :
`SNCF WEB MOBILE PARIS 12`

🤝 Contributing
We love contributions! If you have ideas for improvements or find any bugs, feel free to open an issue or submit a pull request.

📬 Get in Touch
Questions? Suggestions? We'd love to hear from you! Open an issue in this repository, and we'll get back to you as soon as we can.

Happy editing! 🎉
