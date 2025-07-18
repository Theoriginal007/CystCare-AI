# Ovarian Cyst Growth Rate Prediction

## Overview

Machine learning model to predict ovarian cyst growth rates (cm/month) based on patient demographics, clinical features, and diagnostic information. The models aim to assist healthcare providers in making informed decisions about patient management and treatment planning.

## Dataset

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

**Note:** All models show negative R² scores, indicating they perform worse than simply predicting the mean growth rate. This suggests:

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



# Ovarian Cyst Management Prediction Model

## Overview

This machine learning model predicts the recommended management strategy for ovarian cysts based on patient demographics, clinical features, and healthcare resource availability. The model helps healthcare providers make informed decisions about treatment approaches including observation, medication, referral, or surgery.

## Dataset Information

The model was trained on three integrated datasets:

### 1. Ovarian Cyst Dataset (`Ovarian_Cyst.csv`)
- **Size**: 100 patient records
- **Features**: 11 columns including patient demographics, clinical measurements, and symptoms
- **Key Variables**:
  - Patient demographics (Age, Menopause Status)
  - Clinical measurements (Cyst Size, Growth Rate, CA 125 Level)
  - Imaging features (Ultrasound Features)
  - Symptoms (Reported Symptoms)
  - Geographic data (Region)

### 2. Resources Inventory Dataset (`Resources_Inventory.csv`)
- **Size**: 100 records across 10 healthcare facilities
- **Coverage**: 19 regions with 3 categories of medical resources
- **Key Variables**:
  - Facility information and location
  - Medical supplies availability
  - Cost information in KES (Kenya Shillings)

### 3. Treatment Costs Dataset (`Treatment_Costs.csv`)
- **Size**: 100 treatment cost records
- **Key Variables**:
  - Service types and base costs
  - Insurance coverage (NHIF)
  - Out-of-pocket expenses

## Model Performance

Three machine learning algorithms were evaluated:

| Model | Accuracy | Best Performance Metrics |
|-------|----------|-------------------------|
| **XGBoost** | **89.8%** | **Precision: 0.90, Recall: 0.89, F1-Score: 0.89** |
| Random Forest | 86.7% | Precision: 0.87, Recall: 0.85, F1-Score: 0.86 |
| Logistic Regression | 35.7% | Precision: 0.35, Recall: 0.33, F1-Score: 0.33 |

### XGBoost Model Details (Best Performing)
- **Accuracy**: 89.8%
- **Macro Average F1-Score**: 0.89
- **Weighted Average F1-Score**: 0.90

#### Class-wise Performance:
- **Surgery**: Precision: 0.96, Recall: 0.89, F1-Score: 0.92
- **Observation**: Precision: 0.90, Recall: 0.93, F1-Score: 0.92
- **Referral**: Precision: 0.93, Recall: 0.81, F1-Score: 0.87
- **Medication**: Precision: 0.83, Recall: 0.92, F1-Score: 0.87

## Target Classes

The model predicts four management strategies:

1. **Observation** (143 cases) - Monitoring without immediate intervention
2. **Surgery** (134 cases) - Surgical intervention required
3. **Medication** (130 cases) - Pharmacological treatment
4. **Referral** (81 cases) - Specialist referral needed

## Key Features

The model incorporates:
- **Patient Demographics**: Age, menopause status
- **Clinical Measurements**: Cyst size, growth rate, CA 125 levels
- **Imaging Features**: Ultrasound characteristics
- **Symptoms**: Patient-reported symptoms (processed as binary flags)
- **Geographic Data**: Regional healthcare availability
- **Cost Factors**: Treatment costs, insurance coverage
- **Resource Availability**: Medical supplies and facility information

## Data Preprocessing

1. **Missing Value Handling**: SimpleImputer with 'most_frequent' strategy
2. **Categorical Encoding**: One-hot encoding for categorical variables
3. **Feature Engineering**: Multi-symptom strings converted to binary flags
4. **Data Integration**: Merged datasets on common geographic and facility identifiers
5. **Label Encoding**: Target variable encoded for XGBoost compatibility

## Model Files

- `xgboost_model.pkl` - Trained XGBoost model
- `model_pipeline.joblib` - Complete preprocessing and modeling pipeline
- `label_encoder.joblib` - Label encoder for target variable transformation

## Geographic Coverage

The model covers healthcare facilities across 5 main regions in Kenya:
- Nairobi
- Mombasa  
- Kisumu
- Eldoret
- Loitoktok

