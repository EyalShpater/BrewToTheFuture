package ema.brewtothefuture.heat.unit.api;

import ema.brewtothefuture.dto.embedded.FermentationReportDTO;

public interface FermentationReport {
    void addNewReport(FermentationReportDTO report);
}
