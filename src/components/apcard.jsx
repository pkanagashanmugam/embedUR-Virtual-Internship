import React from 'react';

function Apcard(props) {
  const cardBgColor = props.health === 'Healthy' ? 'rgba(177, 253, 119, 0.58)' : props.health === 'Poor' ? 'rgba(255, 38, 0, 0.8)'  : 'rgba(250, 119, 12, 0.71)'; 
  return (
    <div style={{ ...styles.card, backgroundColor: cardBgColor }}>
      <div style={styles.cardBody}>
        <h5 style={styles.heading}>{props.parameter}</h5>
        <p style={styles.content}>{props.count}</p>
        <p style={styles.content}>{props.health}</p>
      </div>
      <div style={styles.cardFooter}>
        {/* <button style={styles.button} onClick={() => props.onUpdate(props.parameter)}>Update Device Status</button>
        <br />
        <button style={styles.button}>Delete Device Status</button> */}
        <button style={styles.button}>Read More</button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    width: '300px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.29)',
    marginTop: '20px',
    overflow: 'hidden',
    marginLeft: '20px',
  },
  cardBody: {
    padding: '20px',
  },
  heading: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333',
  },
  content: {
    fontWeight: '600',
    fontSize: '1rem',
    color: '#666',
  },
  cardFooter: {
    display: 'grid',
    padding: '5px 10px',
    backgroundColor: 'rgba(250, 181, 181, 0.58)',
    textAlign: 'center',
  },
  button: {
    padding: '5px 10px',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default Apcard;
