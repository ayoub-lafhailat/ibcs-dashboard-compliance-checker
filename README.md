# Jugo - IBCS Dashboard Compliance Checker

## Overview

The IBCS Dashboard Compliance Checker is an AI-driven proof-of-concept designed to analyze dashboard images and evaluate whether they comply with selected IBCS (International Business Communication Standards) visualization rules.

The project was developed in collaboration with Jugo as part of a semester project focused on AI, machine learning, computer vision, and software engineering.

The main goal of the project is to assist data analysts and BI professionals by automatically detecting visualization inconsistencies and providing feedback on dashboard standardization.

---

## Project Goal

Business dashboards are often inconsistent in the way scenarios, variances, and visual elements are displayed.
This project explores whether machine learning and computer vision can be used to automatically recognize IBCS-compliant and non-compliant dashboards.

The proof-of-concept focuses specifically on:

* Detecting IBCS visualization patterns
* Identifying compliant vs non-compliant dashboards
* Supporting analysts with automated feedback
* Exploring the feasibility of AI-assisted dashboard validation

---

## Features

* Upload dashboard images
* Analyze dashboards using AI/CNN models
* Detect IBCS-related visualization patterns
* Binary classification:

  * Compliant
  * Non-compliant
* Image preprocessing and augmentation
* Experimental dataset balancing
* Model evaluation and validation
* Research into explainability and rule-based feedback

---

## Technologies Used

### Programming Languages

* Python
* Frontend: React + TypeScript, TailwindCSS
* Backend: FastAPI (Python)

### Libraries & Frameworks

* PyTorch
* Pandas
* NumPy
* Scikit-learn
* Matplotlib
* Seaborn

### Machine Learning / AI

* Convolutional Neural Networks (CNN)
* Image classification
* Dataset balancing
* Data augmentation
* Model validation

### Development Tools

* Jupyter Notebook
* VS Code
* GitHub

  
---

## Overview
This application has three main components:

### Frontend
- Uploads images and displays predictions.

### Backend
- Receives requests, preprocesses images, calls the AI model, and returns predictions as JSON.

### AI Model
- Trained separately and loaded into the backend at runtime.
- Communicates directly via Python function calls (no separate API).

> No database is required; the app processes input and returns results immediately.


---

docs/
├── requirements/
├── analysis/
├── research/
└── evaluation/

---

## Getting Started

### Backend
cd backend
python -m venv venv          # optional if venv exists
source venv/bin/activate      # Mac/Linux
venv\Scripts\activate         # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload

### Frontend
cd frontend
npm install
npm run dev

---

## My Contribution

My contribution focused heavily on both the technical AI implementation and the overall project direction.

### AI & Machine Learning

* Designed and trained CNN-based image classification models
* Built the image preprocessing pipeline
* Implemented dataset balancing techniques
* Experimented with image augmentation strategies
* Performed model validation and evaluation
* Researched how AI could detect IBCS visualization standards

### Data & Research

* Helped define labeling strategies for compliant/non-compliant dashboards
* Researched IBCS rules and how they could be translated into detectable visual patterns
* Investigated the limitations of generative AI for strict compliance checking
* Analyzed model performance and dataset quality issues

### Software Engineering

* Structured and organized the machine learning workflow
* Worked on reproducible experimentation
* Managed model training iterations and testing setups
* Contributed to project architecture and technical decision-making

### Project & Stakeholder Collaboration

* Worked together with stakeholder Jugo
* Participated in requirement discussions and feasibility analysis
* Helped translate business requirements into technical solutions

---

## Challenges

One of the biggest challenges was the limited dataset size.
Because high-quality labeled IBCS dashboard examples are difficult to obtain, the project required extensive experimentation with:

* Small datasets
* Data balancing
* Augmentation techniques
* Validation strategies
* Preventing overfitting

Another important discovery was that large language/generative AI models often applied IBCS rules too strictly or inconsistently, which made traditional computer vision approaches more suitable for this proof-of-concept.

---

## Future Improvements

Possible future improvements include:

* Expanding the dataset significantly
* Multi-label classification for specific IBCS rules
* Explainable AI feedback generation
* Real-time dashboard analysis
* Integration into BI tools such as Power BI or Tableau
* Hybrid rule-based + AI detection systems

---

## Learning Outcomes

This project helped strengthen skills in:

* Machine learning
* Computer vision
* Dataset engineering
* AI experimentation
* Software engineering
* Stakeholder collaboration
* Research and validation
* Translating business problems into technical solutions

---

## Disclaimer

This is a ongoing and project is a proof-of-concept created for educational and research purposes.
It is not intended to replace professional dashboard reviews or official IBCS certification processes.



