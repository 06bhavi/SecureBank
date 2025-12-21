# Project Presentation Guide: SecureBank

**Team Size:** 2 Members  
**Course:** CSI302 - Big Data Analytics  

---

## 1. Role Division (Who Did What?)

To ensure both members have a strong technical contribution to talk about, we have divided the project into **"Data & ML Architecture"** and **"Visualization & Application"**.

### 👤 Member 1: Data Engineer & ML Architect
**Focus Area:** Backend Logic, Data Simulation, Machine Learning Concepts (Units I, II, III).
**Responsibilities:**
*   **Data Pipeline Design:** Defined how data is ingested (Velocity) and processed.
*   **Algorithm Implementation:** Designed the logic for `generateTransaction()` to simulate realistic patterns (Locations, Amounts, Merchants).
*   **Fraud Detection Logic:** Created the rule-based system (e.g., "Amount > 20k", "Foreign Location") and ML Model concepts (Random Forest).
*   **Metrics Calculation:** Responsible for the math behind Accuracy, Precision, and Recall stats.

### 👤 Member 2: Frontend Developer & Visualization Specialist
**Focus Area:** Dashboard UI, Real-time Charts, User Experience (Units IV, V).
**Responsibilities:**
*   **UI/UX Design:** Built the React application with a premium "Glassmorphism" dark theme.
*   **Data Visualization:** Implemented the Complex Charts (Scrollable Area Chart, Pie Charts) using Recharts.
*   **Real-time Interaction:** Built the "Live Monitor" stream and "Pause/Resume" functionality.
*   **Business Logic Integration:** Connected the data streams to the visual component (Alerts, Badges).

---

## 2. Presentation Script & Flow

**Time Limit:** Approx 10-15 Mins
**Language:** English (Professional) / Hindi (Explanation if allowed)

---

### Slide 1: Title & Introduction
**Speaker:** 👤 **Member 1**
*   **Action:** Introduce the team and the project title.
*   **Script:** "Good Morning everyone. We are presenting **'SecureBank'**, a Real-Time Big Data Analytics system designed to detect financial fraud. In the Banking sector (Unit V), standard databases cannot handle the **Velocity** and **Volume** of modern transactions. Our project solves this using Big Data principles."

### Slide 2: Problem Statement & The "5 Vs"
**Speaker:** 👤 **Member 1**
*   **Action:** Explain *Why* this project is needed.
*   **Script:** "Unit I of our syllabus teaches us about the **5 Vs**.
    *   **Volume:** We are handling thousands of transactions.
    *   **Velocity:** Transactions happen every millisecond.
    *   **Veracity:** Distinguishing between a real purchase and a fraud attempt is difficult.
    *   Our system filters this noise to identify high-risk activities instantly."

### Slide 3: System Architecture & ML Logic
**Speaker:** 👤 **Member 1** (This is your main technical part)
*   **Action:** Explain the "Backend" logic.
*   **Script:** "I focused on the Data Engineering aspect.
    *   We simulated a **Spark Streaming** environment where data flows in real-time.
    *   I implemented a hybrid detection engine:
        1.  **Rule-Based:** Immediate flags for 'Foreign Locations' or 'Unusual Times' (Unit II Data Preparation).
        2.  **ML Model:** We simulate a **Random Forest Classifier** (Unit IV) that assigns a 'Risk Score' from 0 to 100.
    *   This logic is what drives the 'Accuracy' and 'F1 Score' you see on the dashboard."

---

### Slide 4: Dashboard & Visualization Tech Stack
**Speaker:** 👤 **Member 2** (Handover)
*   **Action:** Member 1 passes control. "Now, [Member 2 Name] will explain how we visualize this massive data."
*   **Script:** "Thanks. While the backend processes the data, it is useless without proper visualization (CO5).
    *   I developed this dashboard using **React.js** and **Recharts**.
    *   Why? Because traditional tools like Excel cannot handle streaming data.
    *   I designed a **Dark Mode UI** specifically for Security Analysts who work 24/7."

### Slide 5: Key Features Demo (The "Wow" Factor)
**Speaker:** 👤 **Member 2** (Your main technical part)
*   **Action:** Show the screenshots or live demo.
*   **Script:** "Let me highlight two advanced features I built:
    1.  **Live Transaction Stream:** This ticker updates instantly (Velocity). I implemented control features to 'Pause' the stream for deep-dive analysis.
    2.  **24-Hour Adaptive Trend Chart:** This was a complex challenge. To show high-resolution data for a full day, I built a **side-scrolling visualization** with a pinned Y-axis. This allows analysts to scroll through the entire day's volume without losing context of the scale—mapping directly to our 'Data Visualization' practicals."

### Slide 6: Analytics & Insights
**Speaker:** 👤 **Member 2**
*   **Action:** Explain the Pie/Bar charts.
*   **Script:** "Beyond real-time monitoring, we provide Descriptive Analytics:
    *   **Risk Distribution:** A Pie chart showing the ratio of Safe vs. Fraud transactions.
    *   **Pattern Recognition:** A Bar chart that auto-groups frauds by type (e.g., 'High Amount' is the most common attack vector today)."

---

### Slide 7: Conclusion & Future Scope
**Speaker:** 👤 **Member 1** (Wrapping up)
*   **Action:** Bring it back to the course.
*   **Script:** "To conclude, SecureBank demonstrates the practical application of the Big Data syllabus—from **Ingestion (Unit II)** to **ML Processing (Unit IV)** and **Visualization (Unit V)**. In the future, we plan to integrate actual **Hadoop HDFS** storage and **Spark MLLib** for cloud deployment."
*   **Both:** "Thank you. We are open for questions."

