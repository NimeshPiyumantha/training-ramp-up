import 'dart:convert';

import 'package:logger/logger.dart';

import '../model/user_model.dart';
import '../util/db_util.dart';
import '../util/notification.util.dart';
import 'package:http/http.dart' as http;

class UserRepository {
  Future<http.Response> getAllUsers() async {
    final response = await http.get(
      Uri.parse('$baseUrl/users'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
    );
    return response;
  }

  Future<http.Response> getUserByOne(String search) async {
    final response = await http.get(
      Uri.parse('$baseUrl/users/$search'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
    );
    return response;
  }

  Future<void> saveUser(User user) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/users'),
        headers: <String, String>{
          'Content-Type': 'application/json',
        },
        body: jsonEncode(user.toJson()),
      );

      if (response.statusCode != 201) {
        Logger().d('Successfully to create User: ${response.statusCode}');
      }
    } catch (error) {
      Logger().e('Error creating User: $error');
      showFieldError(
          'Error creating User: $error. Please contact the administrator or re-try register.');
    }
  }

  Future<void> updateUser(User user) async {
    try {
      final response = await http.put(
        Uri.parse('$baseUrl/users/${user.email}'),
        headers: <String, String>{
          'Content-Type': 'application/json',
        },
        body: jsonEncode(user.toJson()),
      );

      if (response.statusCode != 201) {
        Logger().d('Successfully to update User: ${response.statusCode}');
      }
    } catch (error) {
      Logger().e('Error updating user: $error');
    }
  }

  Future<void> deleteUser(String userEmail) async {
    try {
      final response = await http.delete(
        Uri.parse('$baseUrl/users/$userEmail'),
      );

      if (response.statusCode != 201) {
        Logger().d('Successfully to delete User: ${response.statusCode}');
      }
    } catch (error) {
      Logger().e('Error deleting user: $error');
    }
  }
}
