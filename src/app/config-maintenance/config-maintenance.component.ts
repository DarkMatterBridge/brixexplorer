import {Component, OnInit} from '@angular/core';
import {ConfigurationService} from "../service/configuration.service";
import {ConditionParserTesterService} from "../service/condition-parser-tester.service";
import {AtomicParserTesterService} from "../service/atomic-parser-tester.service";

@Component({
  selector: 'app-config-maintenance',
  templateUrl: './config-maintenance.component.html',
  styleUrls: ['./config-maintenance.component.scss']
})
export class ConfigMaintenanceComponent implements OnInit {

  constructor(private configurationService: ConfigurationService,
              private cpts: ConditionParserTesterService,
              private apts: AtomicParserTesterService,
  ) {

  }

  ngOnInit(): void {
    let x = this.cpts.runAllTests();
    console.log(x);
    let y = this.apts.runAllTests();
    console.log(y);
  }

  testConditioningParser() {


  }
}
