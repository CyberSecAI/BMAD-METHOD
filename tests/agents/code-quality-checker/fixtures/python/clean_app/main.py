#!/usr/bin/env python3
"""
Clean Flask Application Example

This application demonstrates proper code quality practices including:
- Proper error handling
- Clear function separation
- Type hints and documentation
- Security best practices
- Maintainable code structure
"""

import os
import logging
from typing import Optional, Dict, Any, List
from dataclasses import dataclass
from flask import Flask, request, jsonify
from werkzeug.exceptions import BadRequest, NotFound

from models import User, UserRepository
from validators import UserValidator
from config import Config


@dataclass
class AppResponse:
    """Standard response format for API endpoints."""
    success: bool
    data: Optional[Dict[str, Any]] = None
    message: Optional[str] = None
    errors: Optional[List[str]] = None


class UserService:
    """Service layer for user operations."""
    
    def __init__(self, user_repository: UserRepository, validator: UserValidator):
        self.user_repository = user_repository
        self.validator = validator
        self.logger = logging.getLogger(__name__)
    
    def create_user(self, user_data: Dict[str, Any]) -> AppResponse:
        """
        Create a new user with proper validation and error handling.
        
        Args:
            user_data: Dictionary containing user information
            
        Returns:
            AppResponse with success status and user data or errors
        """
        try:
            # Validate input data
            validation_errors = self.validator.validate_user_creation(user_data)
            if validation_errors:
                return AppResponse(
                    success=False,
                    errors=validation_errors,
                    message="Validation failed"
                )
            
            # Create user
            user = User(
                username=user_data['username'],
                email=user_data['email'],
                password_hash=self._hash_password(user_data['password'])
            )
            
            # Save to repository
            saved_user = self.user_repository.save(user)
            
            self.logger.info(f"User created successfully: {saved_user.username}")
            
            return AppResponse(
                success=True,
                data=saved_user.to_dict(),
                message="User created successfully"
            )
            
        except ValueError as e:
            self.logger.error(f"Validation error creating user: {e}")
            return AppResponse(
                success=False,
                message="Invalid user data",
                errors=[str(e)]
            )
        except Exception as e:
            self.logger.error(f"Unexpected error creating user: {e}")
            return AppResponse(
                success=False,
                message="An unexpected error occurred"
            )
    
    def get_user(self, username: str) -> AppResponse:
        """
        Retrieve user by username.
        
        Args:
            username: The username to search for
            
        Returns:
            AppResponse with user data or not found message
        """
        try:
            if not username or not isinstance(username, str):
                return AppResponse(
                    success=False,
                    message="Valid username is required"
                )
            
            user = self.user_repository.find_by_username(username)
            
            if not user:
                return AppResponse(
                    success=False,
                    message=f"User '{username}' not found"
                )
            
            return AppResponse(
                success=True,
                data=user.to_dict(),
                message="User retrieved successfully"
            )
            
        except Exception as e:
            self.logger.error(f"Error retrieving user {username}: {e}")
            return AppResponse(
                success=False,
                message="Error retrieving user"
            )
    
    def _hash_password(self, password: str) -> str:
        """
        Hash password using secure algorithm.
        
        Args:
            password: Plain text password
            
        Returns:
            Hashed password string
        """
        import bcrypt
        return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')


def create_app(config: Optional[Config] = None) -> Flask:
    """
    Application factory pattern for creating Flask app.
    
    Args:
        config: Optional configuration object
        
    Returns:
        Configured Flask application
    """
    app = Flask(__name__)
    
    # Load configuration
    if config is None:
        config = Config()
    
    app.config.from_object(config)
    
    # Set up logging
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    
    # Initialize services
    user_repository = UserRepository(app.config['DATABASE_URL'])
    user_validator = UserValidator()
    user_service = UserService(user_repository, user_validator)
    
    @app.route('/')
    def health_check() -> Dict[str, str]:
        """Health check endpoint."""
        return {'status': 'healthy', 'service': 'user-management'}
    
    @app.route('/users', methods=['POST'])
    def create_user() -> Dict[str, Any]:
        """Create a new user endpoint."""
        try:
            if not request.is_json:
                raise BadRequest("Content-Type must be application/json")
            
            user_data = request.get_json()
            if not user_data:
                raise BadRequest("Request body is required")
            
            response = user_service.create_user(user_data)
            status_code = 201 if response.success else 400
            
            return jsonify(response.__dict__), status_code
            
        except BadRequest as e:
            return jsonify({
                'success': False,
                'message': str(e)
            }), 400
        except Exception as e:
            app.logger.error(f"Unexpected error in create_user: {e}")
            return jsonify({
                'success': False,
                'message': 'Internal server error'
            }), 500
    
    @app.route('/users/<username>', methods=['GET'])
    def get_user(username: str) -> Dict[str, Any]:
        """Get user by username endpoint."""
        try:
            response = user_service.get_user(username)
            status_code = 200 if response.success else 404
            
            return jsonify(response.__dict__), status_code
            
        except Exception as e:
            app.logger.error(f"Unexpected error in get_user: {e}")
            return jsonify({
                'success': False,
                'message': 'Internal server error'
            }), 500
    
    @app.errorhandler(404)
    def not_found(error) -> Dict[str, Any]:
        """Handle 404 errors."""
        return jsonify({
            'success': False,
            'message': 'Resource not found'
        }), 404
    
    @app.errorhandler(500)
    def internal_error(error) -> Dict[str, Any]:
        """Handle 500 errors."""
        app.logger.error(f"Internal server error: {error}")
        return jsonify({
            'success': False,
            'message': 'Internal server error'
        }), 500
    
    return app


if __name__ == '__main__':
    # Only run in development mode when called directly
    app = create_app()
    app.run(debug=False, host='127.0.0.1', port=5000)