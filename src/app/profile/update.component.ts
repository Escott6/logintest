import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { UserService } from '@app/user/services/user.service';
import { AlertService } from '@app/alerts/services/alert-service';
import { MustMatch } from '@app/helpers/password-match.validator';

@Component({ templateUrl: 'update.component.html' })
export class UpdateComponent implements OnInit {
  user = this.userService.userValue;
  form: FormGroup;
  loading = false;
  submitted = false;
  deleting = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        username: [this.user.username, Validators.required],
        email: [this.user.email, [Validators.required, Validators.email]],
        password: ['', [Validators.minLength(6)]],
        confirmPassword: [''],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.userService
      .update(this.user.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Update successful', {
            keepAfterRouteChange: true,
          });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (error) => {
          this.alertService.error(error);
          this.loading = false;
        },
      });
  }

  onDelete() {
    if (confirm('Are you sure?')) {
      this.deleting = true;
      this.userService
        .delete(this.user.id)
        .pipe(first())
        .subscribe(() => {
          this.alertService.success('Account deleted successfully', {
            keepAfterRouteChange: true,
          });
        });
    }
  }
}
