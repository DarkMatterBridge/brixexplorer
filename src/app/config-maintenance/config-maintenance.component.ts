import {Component, OnInit} from '@angular/core';
import {BridgeSystemManager} from "../service/bridge-system-manager";
import {ConfigurationService} from "../service/configuration.service";
import {ConditionParserTesterService} from "../service/condition-parser-tester.service";

@Component({
  selector: 'app-config-maintenance',
  templateUrl: './config-maintenance.component.html',
  styleUrls: ['./config-maintenance.component.scss']
})
export class ConfigMaintenanceComponent implements OnInit {

  constructor(private configurationService: ConfigurationService,
              private cpts: ConditionParserTesterService) {

  }

  ngOnInit(): void {
    let x = this.cpts.runAllTests();
    console.log(x);
  }

  testConditioningParser() {


  }
}
