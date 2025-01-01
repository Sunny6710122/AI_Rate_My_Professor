# AI Rate My Professor 📚💻

AI Rate My Professor is an AI-powered chatbot designed to assist users in finding detailed information about professors by name or university. Leveraging advanced AI models and real-time communication features, it provides dynamic and accurate responses to user queries.

## Features 🌟

- **AI-Driven Search**: 🤖 Utilizes advanced AI models to provide detailed information about professors.
- **Real-Time Chat**: 💬 Supports real-time communication with WebSockets for seamless interactions.
- **Light and Dark Mode**: 🌞🌙 Offers user-friendly theme options to suit different preferences.
- **Dynamic Responses**: 🔄 Generates responses based on user queries, ensuring relevant and up-to-date information.

## Advanced Capabilities 🚀

- **LLM Tool Call Integration**: 🛠️ Enables dynamic interaction with external tools and APIs for enhanced functionality.
- **Agentic RAG**: 🧠 Combines retrieval and generative models to provide accurate and context-aware responses.

## Screenshots 🖼️

Here are some screenshots of the application in action:

| Dark Mode Interface           | Light Mode Interface          |
|-------------------------------|-------------------------------|
| ![Dark Mode](screenshot/dark_mode.png) | ![Light Mode](screenshot/light_mode.png) |

| Professor Search Result       | LLM Tool Calling Example      |
|-------------------------------|-------------------------------|
| ![Search Result](screenshot/search_result.png) | ![Tool Calling](screenshot/tool_calling.png) |

## Tech Stack ⚙️

- **AI Tools**: Langchain, Pinecone, OpenAI, Agentic RAG, Custom Tool Calling
- **Backend**: FastAPI, WebSockets, Redis
- **Frontend**: HTML, CSS, JavaScript
- **Package Management**: Poetry

## Project Structure 🗂️

- **`data/`**: 📂 Contains data files and databases.
- **`templates/`**: 🎨 Includes HTML templates for the frontend.
- **`tools/`**: 🛠️ Houses Agentic AI Tools for dynamic functionalities.
- **`agent.py`**: 🤖 Contains the AI agent logic.
- **`main.py`**: 🚀 Serves as the FastAPI server entry point.
- **`rag.py`**: 🧠 Implements the Retrieval-Augmented Generation logic.

## Getting Started 🏁

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Sunny6710122/AI_Rate_My_Professor.git
   cd AI_Rate_My_Professor
   ```

2. **Install Dependencies**:

   ```bash
   poetry install
   ```

3. **Run the Application**:

   ```bash
   poetry run python main.py
   ```

## License 📜

This project is licensed under the MIT License.

## Author ✍️

Developed by Sunny6710122.

For more information, visit the [AI Rate My Professor website](https://ai-rate-my-professor-theta.vercel.app/).
