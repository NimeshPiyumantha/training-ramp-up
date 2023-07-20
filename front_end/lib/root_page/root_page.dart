import 'package:flutter/material.dart';
import 'package:ramp_up/home_page/home_page_view.dart';

class RampUpApp extends StatelessWidget {
  const RampUpApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'RampUp App',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      debugShowCheckedModeBanner: false,
      home: const HomePageView(),
    );
  }
}
