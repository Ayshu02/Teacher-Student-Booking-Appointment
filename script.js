document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const studentName = document.getElementById('studentName').value;
    const teacher = document.getElementById('teacher').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    // Create appointment object
    const appointment = {
        studentName,
        teacher,
        date,
        time
    };

    // Save the appointment to local storage
    saveAppointment(appointment);

    // Display the appointment
    displayAppointments();

    // Clear form after submission
    document.getElementById('bookingForm').reset();
});

// Save appointments to localStorage
function saveAppointment(appointment) {
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));
}

// Display all appointments
function displayAppointments() {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const appointmentList = document.getElementById('appointmentList');

    // Clear existing appointments before rendering
    appointmentList.innerHTML = '';

    // Render each appointment
    appointments.forEach((appointment, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>
                <strong>${appointment.studentName}</strong> has an appointment with <strong>${appointment.teacher}</strong> 
                on <strong>${appointment.date}</strong> at <strong>${appointment.time}</strong>
            </span>
            <button class="cancel-btn" onclick="cancelAppointment(${index})">Cancel</button>
        `;
        appointmentList.appendChild(li);
    });
}

// Cancel an appointment
function cancelAppointment(index) {
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];

    // Remove the appointment from the array
    appointments.splice(index, 1);

    // Update localStorage after removing the appointment
    localStorage.setItem('appointments', JSON.stringify(appointments));

    // Re-display appointments after deletion
    displayAppointments();
}

// Display appointments on page load
document.addEventListener('DOMContentLoaded', displayAppointments);
