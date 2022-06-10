import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'TaxCompanion',
      theme: ThemeData(
        primarySwatch: Colors.orange,
      ),
      home: const MyHomePage(title: 'Tax Informer'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);
  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final _formKey = GlobalKey<FormState>();
  String? _country;
  String? _salary;
  String _tax = '';
 
  void getData(String? countryName, String? salary) async{
    final queryParameters = {
      'country': countryName,
      'salary' : salary,
    };
    final uri = Uri.parse(
      'https://127.0.0.1:8080/taxes?country=${countryName}&salary=${salary}');
    final response = await http.get(uri);
    setState((){
      _tax = response.body;
    });
  }

  @override
  Widget build(BuildContext context) {
    final Size screenSize = MediaQuery.of(context).size; 
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title, style: TextStyle(color: Colors.black)),
        backgroundColor: Colors.orange[200],
      ),
      body: Container(
        decoration: BoxDecoration(color: Colors.yellow[50]),
        padding: EdgeInsets.only(left:10.0, right:10.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Form(
              key: _formKey,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  TextFormField(
                    validator: (value){
                      if(value == null || value.isEmpty){
                        return 'Please enter the name of your country';
                      }
                      return null;
                    },
                    decoration: InputDecoration(
                      hintText: 'germany',
                      labelText: 'Country Name',
                    ),
                    onSaved: (String? value){
                      _country = value;
                    }
                  ), // TextFormField
                  TextFormField(
                    validator: (value){
                      if(value == null || value.isEmpty){
                        return "Please enter your salary. PS: We won't tell your wife!";
                      }
                      return null;
                    },
                    decoration: InputDecoration(
                      hintText: '10000',
                      labelText: 'Salary',
                    ),
                    onSaved: (String? value){
                      _salary = value;
                    }

                  ), // TextFormField
                  Container(
                    width: screenSize.width,
                    child: new RaisedButton(
                      child: Text("Find out!", style: TextStyle(color: Colors.black)),
                      onPressed: (){
                        if(!_formKey.currentState!.validate()){
                          return;
                        }
                        _formKey.currentState!.save();
                        print(this._country);
                        print(this._salary);
                        getData(this._country, this._salary);
                      },
                      /*onPressed: this.submit,*/
                      color: Colors.orange[200],
                    ),
                    margin: EdgeInsets.only(top: 20.0)
                  ), // Container
                ]
              ), // Center 
            ), //Form
            SizedBox(height: 20.0),
            Text(_tax, style: TextStyle(fontSize: 30)),
          ],
        ),
      ),
    );
  }
}
