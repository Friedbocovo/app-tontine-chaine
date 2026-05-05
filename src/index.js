import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// ================================
// SOLUTION DÉFINITIVE AU BUG removeChild
// Ce bug est causé par les extensions navigateur
// (Google Translate, Grammarly, gestionnaires de mots de passe)
// qui modifient le DOM après que React l'a rendu
// ================================

// Patch global — intercepte les erreurs removeChild silencieusement
const originalRemoveChild = Node.prototype.removeChild;
Node.prototype.removeChild = function(child) {
  if (child.parentNode !== this) {
    // L'enfant n'appartient pas à ce nœud — ignorer silencieusement
    return child;
  }
  return originalRemoveChild.call(this, child);
};

// Patch insertBefore aussi (même bug possible)
const originalInsertBefore = Node.prototype.insertBefore;
Node.prototype.insertBefore = function(newNode, referenceNode) {
  if (referenceNode && referenceNode.parentNode !== this) {
    return newNode;
  }
  return originalInsertBefore.call(this, newNode, referenceNode);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);