package ema.brewtothefuture.heat.unit.api;

import ema.brewtothefuture.dto.embedded.BrewingReportDTO;

public interface BrewingReport {
    void addNewReport(BrewingReportDTO report);
}
