import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from './BookingForm';

describe('BookingForm', () => {
  const mockProps = {
    availableTimes: {
      availableTimes: ['17:00', '18:00', '19:00']
    },
    dispatch: jest.fn(),
    submitForm: jest.fn()
  };

  test('renders all form fields', () => {
    render(<BookingForm {...mockProps} />);
    
    expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
  });

  test('validates required fields', () => {
    render(<BookingForm {...mockProps} />);
    
    fireEvent.click(screen.getByText(/make your reservation/i));
    
    expect(screen.getByText(/date is required/i)).toBeInTheDocument();
    expect(screen.getByText(/time is required/i)).toBeInTheDocument();
    expect(screen.getByText(/number of guests is required/i)).toBeInTheDocument();
    expect(screen.getByText(/occasion is required/i)).toBeInTheDocument();
  });

  test('validates date is not in the past', () => {
    render(<BookingForm {...mockProps} />);
    
    const dateInput = screen.getByLabelText(/choose date/i);
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    
    fireEvent.change(dateInput, { 
      target: { 
        name: 'date',
        value: pastDate.toISOString().split('T')[0] 
      } 
    });
    
    fireEvent.click(screen.getByText(/make your reservation/i));
    
    expect(screen.getByText(/date cannot be in the past/i)).toBeInTheDocument();
  });

  test('validates number of guests range', () => {
    render(<BookingForm {...mockProps} />);
    
    const guestsInput = screen.getByLabelText(/number of guests/i);
    
    fireEvent.change(guestsInput, { 
      target: { 
        name: 'guests',
        value: '11'
      } 
    });
    
    fireEvent.click(screen.getByText(/make your reservation/i));
    
    expect(screen.getByText(/number of guests must be between 1 and 10/i)).toBeInTheDocument();
  });

  test('submits form with valid data', () => {
    render(<BookingForm {...mockProps} />);
    
    // Fill in valid form data
    fireEvent.change(screen.getByLabelText(/choose date/i), {
      target: {
        name: 'date',
        value: new Date().toISOString().split('T')[0]
      }
    });
    
    fireEvent.change(screen.getByLabelText(/choose time/i), {
      target: {
        name: 'time',
        value: '17:00'
      }
    });
    
    fireEvent.change(screen.getByLabelText(/number of guests/i), {
      target: {
        name: 'guests',
        value: '4'
      }
    });
    
    fireEvent.change(screen.getByLabelText(/occasion/i), {
      target: {
        name: 'occasion',
        value: 'Birthday'
      }
    });
    
    fireEvent.click(screen.getByText(/make your reservation/i));
    
    expect(mockProps.submitForm).toHaveBeenCalledWith({
      date: expect.any(String),
      time: '17:00',
      guests: '4',
      occasion: 'Birthday'
    });
  });

  test('updates available times when date changes', () => {
    render(<BookingForm {...mockProps} />);
    
    const dateInput = screen.getByLabelText(/choose date/i);
    const newDate = new Date().toISOString().split('T')[0];
    
    fireEvent.change(dateInput, {
      target: {
        name: 'date',
        value: newDate
      }
    });
    
    expect(mockProps.dispatch).toHaveBeenCalledWith({ type: 'UPDATE_TIMES', payload: newDate });
  });

  test('clears error messages when valid input is provided', () => {
    render(<BookingForm {...mockProps} />);
    
    // Trigger validation errors
    fireEvent.click(screen.getByText(/make your reservation/i));
    expect(screen.getByText(/date is required/i)).toBeInTheDocument();
    
    // Provide valid input
    const dateInput = screen.getByLabelText(/choose date/i);
    fireEvent.change(dateInput, {
      target: {
        name: 'date',
        value: new Date().toISOString().split('T')[0]
      }
    });
    
    // Error message should be gone
    expect(screen.queryByText(/date is required/i)).not.toBeInTheDocument();
  });

  test('updates form state on input change', () => {
    render(<BookingForm {...mockProps} />);
    
    const dateInput = screen.getByLabelText(/choose date/i);
    const timeSelect = screen.getByLabelText(/choose time/i);
    const guestsInput = screen.getByLabelText(/number of guests/i);
    const occasionSelect = screen.getByLabelText(/occasion/i);
    
    const testDate = new Date().toISOString().split('T')[0];
    
    // Change date
    fireEvent.change(dateInput, {
      target: {
        name: 'date',
        value: testDate
      }
    });
    expect(dateInput.value).toBe(testDate);
    
    // Change time
    fireEvent.change(timeSelect, {
      target: {
        name: 'time',
        value: '18:00'
      }
    });
    expect(timeSelect.value).toBe('18:00');
    
    // Change guests
    fireEvent.change(guestsInput, {
      target: {
        name: 'guests',
        value: '5'
      }
    });
    expect(guestsInput.value).toBe('5');
    
    // Change occasion
    fireEvent.change(occasionSelect, {
      target: {
        name: 'occasion',
        value: 'Anniversary'
      }
    });
    expect(occasionSelect.value).toBe('Anniversary');
  });
}); 