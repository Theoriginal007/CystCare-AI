# Ovarian Cyst Growth Rate Prediction

## Overview

This project develops machine learning models to predict ovarian cyst growth rates (cm/month) based on patient demographics, clinical features, and diagnostic information. The models aim to assist healthcare providers in making informed decisions about patient management and treatment planning.

## Dataset

**Source:** `Ovarian_Cyst.csv`
**Size:** 100 patient records
**Target Variable:** Cyst Growth Rate (cm/month)

### Features

| Feature | Type | Description |
|---------|------|-------------|
| Age | Numeric | Patient age in years |
| Menopause Status | Categorical | Pre-menopausal/Post-menopausal |
| Cyst Size (cm) | Numeric | Current cyst size in centimeters |
| CA 125 Level | Numeric | Cancer antigen 125 blood test level |
| Ultrasound Features | Categorical | Imaging characteristics (excluded from modeling) |
| Reported Symptoms | Text | Patient-reported symptoms (excluded from modeling) |
| Recommended Management | Categorical | Treatment recommendation (Observation/Medication/Referral/Surgery) |
| Region | Categorical | Geographic location (Eldoret/Kisumu/Loitoktok/Mombasa/Nairobi) |

### Data Statistics

- **Age Range:** 15-65 years (mean: 40.1 years)
- **Cyst Size Range:** 2.0-10.0 cm (mean: 5.9 cm)
- **Growth Rate Range:** -0.5 to 1.48 cm/month (mean: 0.43 cm/month)
- **CA 125 Level Range:** 5-150 (mean: 76.7)
- **No missing values detected**

## Data Preprocessing

### Feature Engineering
1. **Dropped Non-Predictive Features:**
   - Patient ID (identifier only)
   - Date of Exam (temporal data not used for time-series analysis)
   - Reported Symptoms (free text, complex to process)
   - Ultrasound Features (assumed textual, not structured)

2. **Categorical Encoding:**
   - One-hot encoding for Menopause Status (baseline: Post-menopausal)
   - One-hot encoding for Region (baseline: Eldoret)
   - One-hot encoding for Recommended Management (baseline: Medication)

3. **Final Feature Set (9 features):**
   - Age
   - Cyst Size (cm)
   - CA 125 Level
   - Menopause Status_Pre-menopausal
   - Region_Kisumu, Region_Loitoktok, Region_Mombasa, Region_Nairobi
   - Recommended Management_Observation, Recommended Management_Referral, Recommended Management_Surgery

## Model Development

### Train-Test Split
- **Training Set:** 80% (80 samples)
- **Test Set:** 20% (20 samples)
- **Random State:** 42 (for reproducibility)

### Models Evaluated

1. **Linear Regression**
   - Simple baseline model
   - Assumes linear relationships between features and target

2. **Random Forest Regressor**
   - Ensemble method using multiple decision trees
   - Handles non-linear relationships and feature interactions
   - Provides feature importance scores

3. **Gradient Boosting Regressor**
   - Sequential ensemble method
   - Builds models iteratively to correct previous errors
   - Often performs well on tabular data

## Results

### Model Performance

| Model | R² Score | RMSE | MAE |
|-------|----------|------|-----|
| Linear Regression | -0.327 | 0.658 | 0.554 |
| Random Forest | -0.529 | 0.706 | 0.599 |
| Gradient Boosting | -1.099 | 0.827 | 0.653 |

### Performance Analysis

⚠️ **Important Note:** All models show negative R² scores, indicating they perform worse than simply predicting the mean growth rate. This suggests:

1. **Limited Predictive Power:** The available features may not contain sufficient information to predict cyst growth rates accurately
2. **Small Dataset:** 100 samples may be insufficient for robust model training
3. **Complex Biological Process:** Cyst growth likely depends on unmeasured factors (genetics, hormones, detailed imaging characteristics)

### Feature Importance (Random Forest)

The Random Forest model identified the most important features for prediction, though overall model performance was poor. Feature importance analysis can still provide insights into which variables show the strongest associations with growth rate.

## Limitations and Future Work

### Current Limitations
- Small dataset size (100 samples)
- Negative R² scores indicate poor predictive performance
- Limited feature set may not capture key biological factors
- No validation on external datasets

### Recommendations for Improvement
1. **Data Collection:**
   - Increase sample size significantly (target: 1000+ samples)
   - Include additional clinical features (hormone levels, genetic markers)
   - Structured ultrasound feature extraction
   - Longitudinal data for time-series analysis

2. **Feature Engineering:**
   - Age binning and interaction terms
   - Symptom text analysis using NLP
   - Regional clustering based on healthcare infrastructure
   - Temporal features from examination dates

3. **Model Enhancements:**
   - Cross-validation for more robust evaluation
   - Hyperparameter tuning
   - Feature selection techniques
   - Try other algorithms (XGBoost, Neural Networks)

4. **Clinical Validation:**
   - Collaborate with medical professionals for feature selection
   - External validation on independent datasets
   - Consider clinical significance of prediction errors

## Usage

### Requirements
```python
pandas >= 1.3.0
scikit-learn >= 0.24.0
numpy >= 1.21.0
matplotlib >= 3.3.0
seaborn >= 0.11.0
```

### Running the Models
```python
# Load and preprocess data
df = pd.read_csv('Ovarian_Cyst.csv')
# ... preprocessing steps ...

# Train models
from sklearn.ensemble import RandomForestRegressor
model = RandomForestRegressor(random_state=42)
model.fit(X_train, y_train)
predictions = model.predict(X_test)
```
