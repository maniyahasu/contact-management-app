import { TestBed } from '@angular/core/testing';
import { User } from '../model/user.model';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  const getCurrentUserSpy = jasmine.createSpyObj<UserService>('UserService', ['getCurrentUser']);
  const setCurrentUserSpy = jasmine.createSpyObj<UserService>('UserService', ['saveCurrentUser']);
  const getUserListSpy = jasmine.createSpyObj<UserService>('UserService', ['getUserList']);
  const saveUserListSpy = jasmine.createSpyObj<UserService>('UserService', ['saveUserList']);
  const clearCurrentUserSpy = jasmine.createSpyObj<UserService>('UserService', ['clearCurrentUser']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { 
          provide: UserService,
          useValue: [
            getCurrentUserSpy, 
            setCurrentUserSpy, 
            getUserListSpy,
            saveUserListSpy
          ]
        }
      ]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return current user', () => {
    getCurrentUserSpy.getCurrentUser();
    expect(getCurrentUserSpy.getCurrentUser).toHaveBeenCalled();
  });

  it('should save current user', () => {
    let user: User = {
      firstName: 'first name',
      lastName: 'last name',
      email: 'test@gmail.com',
      password: ''
    }
    setCurrentUserSpy.saveCurrentUser(user);
    expect(setCurrentUserSpy.saveCurrentUser).toHaveBeenCalled();
  });

  it('should return user list', () => {
    getUserListSpy.getUserList();
    expect(getUserListSpy.getUserList).toHaveBeenCalled();
  });

  it('should save user list', () => {
    let users: User[] = [
      { firstName: 'test', lastName: 'test', email: 'email@gmail.com', password: '' }
    ]
    saveUserListSpy.saveUserList(users);
    expect(saveUserListSpy.saveUserList).toHaveBeenCalled();
  });

  it('should clear current user', () => {
    clearCurrentUserSpy.clearCurrentUser();
    expect(clearCurrentUserSpy.clearCurrentUser).toHaveBeenCalled();
  });
});
