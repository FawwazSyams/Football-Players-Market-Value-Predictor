import pandas as pd
import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score, mean_absolute_error

def clean_bonservis(value):
    if pd.isna(value) or value == 0:
        return 0.0
    if isinstance(value, str):
        value = value.replace('€', '').replace('.', '').replace(',', '.').strip()
        if 'M' in value:
            return float(value.replace('M', '')) * 1000000
        elif 'K' in value:
            return float(value.replace('K', '')) * 1000
        try:
            return float(value)
        except:
            return 0.0
    return float(value)

# 1. Load Data
df = pd.read_csv('dataset.csv')

# 2. Preprocessing
df['Bonservis_Numeric'] = df['Bonservis'].apply(clean_bonservis)
features = ['Yaş', 'GLS', 'AST', 'DK'] 
X = df[features].fillna(0)
y = df['Bonservis_Numeric'].fillna(0)

# 3. Split Data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 4. Training (Algoritma: RANDOM FOREST)
print("Sedang melatih model Random Forest...")
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 5. CEK AKURASI
y_pred = model.predict(X_test)
score_r2 = r2_score(y_test, y_pred)
mae = mean_absolute_error(y_test, y_pred)

print(f"\n--- HASIL EVALUASI MODEL ---")
print(f"Skor R2 (Akurasi): {score_r2:.4f} ({score_r2*100:.2f}%)")
print(f"Rata-rata Error: € {mae:,.0f}")
print("----------------------------\n")

# 6. Simpan Model
with open('model_bola.pkl', 'wb') as file:
    pickle.dump(model, file)
print("File 'model_bola.pkl' sudah siap!")