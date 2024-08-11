// sum.cpp

#include <iostream>

int main() {
    int num1, num2, sum;

    // Prompt user for input
    std::cout << "Enter first number: ";
    std::cin >> num1;

    std::cout << "Enter second number: ";
    std::cin >> num2;

    // Calculate the sum
    sum = num1 + num2;

    // Output the result
    std::cout << "The sum of " << num1 << " and " << num2 << " is " << sum << std::endl;

    return 0;
}
