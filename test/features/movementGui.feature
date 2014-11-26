Feature: User moves the robot using the GUI
  In order to have a robo-gasm
  As a proper geek
  I want to control the movement of my node-rover remotely

  Scenario: User moves node-rover forward
    Given I am on '/remotecontrol'
    When I click on 'up'
    Then 'move-forward' gets sent

  Scenario: User moves node-rover backward
    Given I am on '/remotecontrol'
    When I click on 'down'
    Then 'move-backward' gets sent

  Scenario: User moves node-rover right
    Given I am on '/remotecontrol'
    When I click on 'right'
    Then 'move-right' gets sent

  Scenario: User moves node-rover left
    Given I am on '/remotecontrol'
    When I click on 'left'
    Then 'move-left' gets sent
