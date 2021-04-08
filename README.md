# XenElectronic
## Context
The goal of these exercises are to assess your proficiency in software engineering that is related to the daily work that we do at Xendit. Please upload the completed assessment to github repository and share with us the link to the repository. We expect the mandatory tasks to be completed and submitted within 3 days. Please refer to the section below for the task details.

## Background
XenElectronic is one of electronics and home appliance store. To improve customers’ growth for their business, the manager of the store plans to build a web application where customers can purchase their products online. As the full stack developer, you were asked to design and build simple yet responsive web application using React to allow XenElectronic customers to purchase their products online. Below are the list of key features for the MVP of the web application:
- Customers should be able to view the list of the products based on the product categories
- Customers should be able to add the products to the shopping cart
- Customers should be able to view the products listed on the shopping cart
- Customers should be able to remove the products listed on the shopping cart
- Customers should be able to checkout shopping cart and continue their transaction to payment

## Deliverables
Below will be your set of tasks to accomplish. Please work on each of these tasks in order. Success criteria will be defined clearly for each task.

### Documentation
Please deliver a clear documentation (feel free to use any format / diagram) that clearly explains the goals of this project and clarifies the web application navigation and the API response that is expected.
#### Success Criteria
1. A pull request against `master` branch of your repository with a clear description of the change and purpose and merge it
2. **[BONUS]** Document API Specification using OpenApi Spec

### Application
1. Design and implementation of REST API for web application feature (feel free to use any database
engine and programming language of your choice) :
    - View the list of the products based on the product categories
    - Add the products to the shopping cart
    - View the products listed on the shopping cart
    - Remove the products listed on the shopping cart
    - Checkout shopping cart and continue their transaction to payment page
2. Responsive web application with UI built using React
3. Unit test for backend of the application
4. Readme content about how to build and start the application (sample of good README content
[a link](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2))
#### Success Criteria
1. A pull request against `master` branch of your repository with a clear description of the change
and purpose and merge it
2. Unit test with at least `80%` code coverage across lines, statements, and branches
3. Combine code repository for both API and UI application and include a shortcut command on how
to start both application
4. **[BONUS]** Add Unit test for the front end application
5. **[BONUS]** Add Typescript support

### Implement Tooling
#### Please implement the following tooling:
1. eslint - for linting
2. nyc - for code coverage
3. pre-push - for git pre push hook running tests
#### Success Criteria
1. Create a pull request against `master` branch of your repository with the new tooling and merge it
2. eslint should have an opinionated format
3. nyc should aim for test coverage of `80%` across lines, statements, and branches
4. pre-push should run the tests before allowing pushing using `git`
5. Ensure that tooling is connected to `npm test`
6. [BONUS] Add hot reloading feature for local environment development
### Security
Please implement the following security controls for your system:

1. Ensure the system is not vulnerable to SQL injection
([a link](https://www.owasp.org/index.php/SQL_Injection))
2. [BONUS] Implement an additional web application security improvement of your choice
#### Success Criteria
1. A pull request against `master` branch of your repository with:
    - Changes to the code
    - Tests ensuring the vulnerability is addressed

### **[Bonus]** Deployment
- Deploy the web application to web hosting providers such as [a link](https://pages.github.com/)
- Deploy the rest API to cloud service providers such as [a link](https://www.heroku.com/)