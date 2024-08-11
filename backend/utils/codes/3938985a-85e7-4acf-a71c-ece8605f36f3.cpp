#include <iostream>
using namespace std;

int main() {
    int num1, num2, sum;

    // Prompt the user for input
    cout << "Enter first number: ";
    cin >> num1;
    cout << "Enter second number: ";
    cin >> num2;

    // Calculate the sum
    sum = num1 + num2;

    // Output the result
    cout << "The sum of " << num1 << " and " << num2 << " is " << sum << endl;

    return 0;
}
