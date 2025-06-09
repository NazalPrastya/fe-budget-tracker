# FE Budget Tracker

This is the **frontend** for the budget tracking application, built with **Next.js** and **TypeScript**. It provides the user interface for interacting with the BE Budget Tracker (backend).

---

## How to Run

Follow these steps to get the frontend application running on your local machine:

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/NazalPrastya/fe-budget-tracker.git](https://github.com/NazalPrastya/fe-budget-tracker.git)
    ```

2.  **Navigate into the project directory:**

    ```bash
    cd fe-budget-tracker
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    ```

    (If you prefer `yarn`, you can use `yarn install` instead.)

4.  **Create a `.env.local` file:**
    If your frontend needs to know the URL of your backend API, you'll likely have a `.env.example` file. Copy it to `.env.local` and update any necessary environment variables, such as `NEXT_PUBLIC_API_URL` (or whatever prefix your Next.js app uses for public environment variables).

5.  **Start the development server:**

    ```bash
    npm run dev
    ```

    (Or `yarn dev` if using yarn.)

    This will typically open the application in your web browser at `http://localhost:3000` (or another port as indicated in your terminal).

---

## Short Explanation

This project is the **frontend part** of a budget tracker application, leveraging the power of **Next.js** for server-side rendering/static site generation and **TypeScript** for type safety and improved developer experience.

Its primary responsibilities include:

- **Displaying budget data:** It presents income, expenses, categories, and financial summaries in an intuitive and responsive user interface.
- **User interaction:** Users can easily add new transactions, categorize expenses, view financial reports, and manage their budget through an interactive UI.
- **Communicating with the backend:** It makes API calls to the **BE Budget Tracker** to fetch and send data, ensuring all financial information is persistently stored and managed.

In essence, this frontend is the robust, type-safe, and visually appealing layer that empowers users to effectively track and manage their budget.
