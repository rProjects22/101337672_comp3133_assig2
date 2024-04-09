import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [],
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.scss'
})

export class UpdateEmployeeComponent implements OnInit {
  updateForm!: FormGroup; // Mark updateForm as optional

  employeeId!: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id')!;
    this.updateForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      salary: ['', Validators.required]
    });

    // Fetch employee data by ID when component initializes
    this.getEmployeeDataById(this.employeeId).then(employeeData => {
      if (employeeData) {
        this.updateForm.patchValue(employeeData);
      }
    });
  }

  onSubmit(): void {
    if (this.updateForm.valid) {
      const updatedEmployee = this.updateForm.value;
      // Update employee data by ID
      this.updateEmployeeData(this.employeeId, updatedEmployee).then(() => {
        this.router.navigate(['/employees']); // Redirect to employee list after update
      }).catch(error => {
        console.error('Failed to update employee:', error);
        // Optionally, display an error message to the user
      });
    }
  }

  // Placeholder method to fetch employee data by ID
  private async getEmployeeDataById(id: string): Promise<any> {
    // Implement your logic to fetch employee data by ID here
    // For example, you might make an HTTP request to your backend
    try {
      const response = await fetch(`http://localhost:3000/api/employees/${id}`);
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Failed to fetch employee data');
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
      return null;
    }
  }

  // Placeholder method to update employee data
  private async updateEmployeeData(id: string, data: any): Promise<void> {
    // Implement your logic to update employee data here
    // For example, you might make an HTTP request to your backend
    try {
      const response = await fetch(`http://localhost:3000/api/employees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error('Failed to update employee data');
      }
    } catch (error) {
      console.error('Error updating employee data:', error);
      throw error;
    }
  }
}