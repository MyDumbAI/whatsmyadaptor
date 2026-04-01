const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const uploadPrompt = document.getElementById('uploadPrompt');
const preview = document.getElementById('preview');
const analyzeBtn = document.getElementById('analyzeBtn');
const resultDiv = document.getElementById('result');
const resultText = document.getElementById('resultText');
const errorDiv = document.getElementById('error');
const errorText = document.getElementById('errorText');

let selectedFile = null;

uploadArea.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', () => {
  if (fileInput.files[0]) handleFile(fileInput.files[0]);
});

uploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadArea.classList.add('drag-over');
});

uploadArea.addEventListener('dragleave', () => {
  uploadArea.classList.remove('drag-over');
});

uploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadArea.classList.remove('drag-over');
  if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
});

function handleFile(file) {
  const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowed.includes(file.type)) {
    showError('Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image.');
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    showError('File is too large. Maximum size is 10MB.');
    return;
  }

  selectedFile = file;
  hideError();
  hideResult();

  const reader = new FileReader();
  reader.onload = (e) => {
    preview.src = e.target.result;
    preview.hidden = false;
    uploadPrompt.hidden = true;
  };
  reader.readAsDataURL(file);

  analyzeBtn.disabled = false;
}

analyzeBtn.addEventListener('click', async () => {
  if (!selectedFile) return;

  analyzeBtn.disabled = true;
  analyzeBtn.classList.add('loading');
  analyzeBtn.textContent = 'Analyzing...';
  hideError();
  hideResult();

  const formData = new FormData();
  formData.append('image', selectedFile);

  try {
    const response = await fetch('/analyze', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      showError(data.error || 'Something went wrong. Please try again.');
    } else {
      showResult(data.result);
    }
  } catch (err) {
    showError('Could not reach the server. Please check your connection and try again.');
  } finally {
    analyzeBtn.disabled = false;
    analyzeBtn.classList.remove('loading');
    analyzeBtn.textContent = 'Identify This';
  }
});

function showResult(text) {
  resultText.textContent = text;
  resultDiv.hidden = false;
}

function hideResult() {
  resultDiv.hidden = true;
  resultText.textContent = '';
}

function showError(msg) {
  errorText.textContent = msg;
  errorDiv.hidden = false;
}

function hideError() {
  errorDiv.hidden = true;
  errorText.textContent = '';
}
