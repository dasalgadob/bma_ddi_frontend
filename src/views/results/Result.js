import React, { Component } from 'react';

export default function Result({ match }) {
    return (
      <div>
        <h3>ID: {match.params.id}</h3>
      </div>
    );
  }


