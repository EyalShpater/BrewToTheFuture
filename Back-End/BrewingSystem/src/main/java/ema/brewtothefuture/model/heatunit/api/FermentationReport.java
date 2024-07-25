package ema.brewtothefuture.model.heatunit.api;

import ema.brewtothefuture.dto.embedded.FermentationReportDTO;

public interface FermentationReport {
    void addNewReport(FermentationReportDTO report);
}
